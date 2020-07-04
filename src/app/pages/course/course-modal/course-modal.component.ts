import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { parse } from 'himalaya';

import { Course } from 'src/app/interfaces/course.interface';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css'],
})
export class CourseModalComponent implements OnInit {
  @ViewChild('editCourseForm', { static: false }) editCourseForm: NgForm;
  @Input() editMode: boolean;
  @Input() courseData: Course;
  @Input() title: string;
  @Input() visible: string;

  private courseDataCopy: Course;

  private noDataChange = () => this.editCourseForm.pristine;

  constructor(
    private editCourseModal: NgbActiveModal,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseDataCopy = new Course(this.editMode ? this.courseData : null);
  }

  public onSave() {
    this.editCourseForm.ngSubmit.emit();
    if (this.editCourseForm.valid) {
      if (this.editMode) {
        this.courseService.updateCourse(this.courseDataCopy).subscribe(
          () => {
            this.onSuccess();
          },
          (err) => this.onFailure(err)
        );
      } else {
        this.courseService.createCourse(this.courseDataCopy).subscribe(
          () => {
            this.onSuccess();
          },
          (err) => this.onFailure(err)
        );
      }
    } else {
    }
  }

  public undoChanges() {
    this.courseDataCopy = new Course(this.courseData);
  }

  private onFailure = (res: HttpErrorResponse) => {
    const json = parse(res.error);
    const err = json[2].children[3].children[1].children[0].content;

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err,
      footer:
        'Si el problema persiste, por favor comuníqueselo al administrador de la plataforma.',
    });
  };

  private onSuccess() {
    this.editCourseModal.close();
    Swal.fire('Enhorabuena!', 'Registro guardado exitosamente.', 'success');
  }
}
