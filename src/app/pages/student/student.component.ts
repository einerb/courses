import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { StudentModalComponent } from '../student/student-modal/student-modal.component';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  public visible = false;
  public studentData: Student[];

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.allStudents();
  }

  private allStudents() {
    this.studentService.getAll().subscribe((res) => {
      this.studentData = res.data;

      if (this.studentData.length > 0) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    });
  }

  public deleteStudent(id: any) {
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
        this.studentService.deleteStudent(id).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'La orden fue eliminada exitosamente.',
            'success'
          );
          this.allStudents();
        });
      }
    });
  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(StudentModalComponent, dialogConfig);
  }

  public onEdit({ name, lastname, email, age }: Student) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      name,
      lastname,
      email,
      age,
    };
    this.dialog.open(StudentModalComponent, dialogConfig);
  }
}
