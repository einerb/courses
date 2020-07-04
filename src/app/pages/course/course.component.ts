import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { Course } from '../../interfaces/course.interface';
import { CourseModalComponent } from '../course/course-modal/course-modal.component';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  public count = 0;
  public courseData: Course[];
  public editingMode: boolean;
  public selected: Course;
  public selectedRow: number;
  public courseToEdit: Course;
  public visible = false;

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.allCourses();
  }

  private allCourses() {
    this.courseService.getAll().subscribe((res) => {
      this.courseData = res.data;

      if (this.courseData.length > 0) {
        this.visible = false;
      } else {
        this.visible = true;
      }

      this.spinner.hide();
    });
  }

  public countStudent(id: any) {
    this.studentService.countStudent(id).subscribe((res) => {
      this.count = res.data;

      Swal.fire({
        icon: 'info',
        title: 'Cantidad de estudiantes',
        html:
          'El curso contiene <b>' +this.count +'</b> estudiante(s) actualmente!',
      });
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
            'El curso fue eliminado exitosamente.',
            'success'
          );
          this.allCourses();
        });
      }
    });
  }

  public onSelect = (course: Course) => {
    this.selected = course;
    this.editCourse();
  };

  public setClickedRow = (index: number) => {
    this.selectedRow = index;
  };

  public addCourse() {
    this.editingMode = false;
    this.openEditCourseModal();
  }

  public editCourse() {
    this.editingMode = true;
    this.openEditCourseModal();
  }

  public openEditCourseModal() {
    const modalRef = this.modalService.open(CourseModalComponent, {
      windowClass: 'large-modal',
    });

    modalRef.componentInstance.editMode = this.editingMode;
    modalRef.componentInstance.title = this.editingMode
      ? 'Editar curso'
      : 'Crear curso';
    modalRef.componentInstance.courseData = this.editingMode
      ? this.selected
      : null;
  }
}
