import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { parse } from 'himalaya';
import { Router } from '@angular/router';

import { CourseService } from 'src/app/services/course.service';
import { Course, Assignment } from 'src/app/interfaces/course.interface';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrls: ['./assign-modal.component.css'],
})
export class AssignModalComponent implements OnInit {
  public coursesData: Course[];

  @ViewChild('editAssignForm', { static: false }) editAssignForm: NgForm;
  @Input() editMode: boolean;
  @Input() courseData: Assignment;
  @Input() title: string;
  @Input() visible: string;
  @Input() id: any;

  public courseDataCopy: Assignment;

  private noDataChange = () => this.editAssignForm.pristine;

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    public editAssignModal: NgbActiveModal,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allCourses();
    this.courseDataCopy = new Assignment(
      this.editMode ? this.courseData : null
    );
  }

  private allCourses() {
    this.courseService.getAll().subscribe((res) => {
      this.courseData = res.data;
    });
  }

  public onSave() {
    this.editAssignForm.ngSubmit.emit();

    if (this.editAssignForm.valid) {
      this.studentService.assignCourse(this.id, this.courseDataCopy).subscribe(
        () => {
          this.onSuccess();
        },
        (err) => this.onFailure(err)
      );
    } else {
    }
  }

  public undoChanges() {
    this.courseDataCopy = new Assignment(this.courseData);
  }

  private onFailure = (res: HttpErrorResponse) => {
    const json = parse(res.error);
    const err = json[2].children[3].children[1].children[0].content;

    this.router.navigate(['student-details', this.id]);

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err,
      footer:
        'Si el problema persiste, por favor comuníqueselo al administrador de la plataforma.',
    });
  };

  private onSuccess() {
    this.editAssignModal.close();
    Swal.fire('Enhorabuena!', 'Registro guardado exitosamente.', 'success');
  }
}
