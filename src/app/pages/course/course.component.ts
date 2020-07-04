import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

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
  public visible = false;
  public courseData: Course[];
  public count = 0;

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.allCourses();
  }

  private allCourses() {
    this.courseService.getAll().subscribe((res) => {
      this.courseData = res.data;

      this.count = res.data.map((result) => {
        this.studentService.countStudent(result._id).subscribe((res) => {
          this.count = res.data;
        });
      });

      if (this.courseData.length > 0) {
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
          this.allCourses();
        });
      }
    });
  }

}
