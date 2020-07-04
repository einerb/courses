import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Student } from '../../interfaces/student.interface';
import { StudentModalComponent } from '../student/student-modal/student-modal.component';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  public editingMode: boolean;
  public selected: Student;
  public selectedRow: number;
  public studentData: Student[];
  public userToEdit: Student;
  public visible = false;

  constructor(
    private studentService: StudentService,
    private modalService: NgbModal
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

  public onSelect = (user: Student, index: number) => {
    this.selected = user;
    this.editStudent();
  };

  public setClickedRow = (index: number) => {
    this.selectedRow = index;
  };

  public addStudent() {
    this.editingMode = false;
    this.openEditStudentModal();
  }

  public editStudent() {
    this.editingMode = true;
    this.openEditStudentModal();
  }

  private openEditStudentModal() {
    const modalRef = this.modalService.open(StudentModalComponent, {
      windowClass: 'large-modal',
    });
    modalRef.componentInstance.editMode = this.editingMode;
    modalRef.componentInstance.title = this.editingMode
      ? 'Editar estudiante'
      : 'Crear estudiante';
    modalRef.componentInstance.userData = this.editingMode
      ? this.selected
      : null;
  }
}
