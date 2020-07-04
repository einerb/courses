import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AssignModalComponent } from '../assign-modal/assign-modal.component';
import { Course } from 'src/app/interfaces/course.interface';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  public id;
  public courseData;
  public studentData;
  public visible;
  public editingMode: boolean;
  public selected: Course;
  public selectedRow: number;

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('_id');
    this.getId(this.id);
  }

  private getId(id: any) {
    this.studentService.getById(id).subscribe((res) => {
      this.studentData = res.data;

      if (this.studentData.courses?.length > 0) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    });
  }

  public deleteCourse(id: any) {
    Swal.fire({
      title: 'Está seguro?',
      text: 'Sí elimina no podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo eliminar!',
    }).then((result) => {
      if (result.value) {
        this.courseService.deleteCourse(id).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'La orden fue eliminada exitosamente.',
            'success'
          );
          this.getId(this.id);
        });
      }
    });
  }

  public addAssign() {
    this.openEditAssignModal();
  }

  private openEditAssignModal() {
    const modalRef = this.modalService.open(AssignModalComponent, {
      windowClass: 'large-modal',
    });
    modalRef.componentInstance.editMode = this.editingMode;
    modalRef.componentInstance.id = this.editingMode ? '' : this.id;
    modalRef.componentInstance.title = this.editingMode ? '' : 'Asignar curso';
    modalRef.componentInstance.userData = this.editingMode
      ? this.selected
      : null;
  }
}
