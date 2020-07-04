import Swal from 'sweetalert2';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { parse } from 'himalaya';

import { Student } from '../../../interfaces/student.interface';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css'],
})
export class StudentModalComponent implements OnInit {
  @ViewChild('editStudentForm', { static: false }) editStudentForm: NgForm;
  @Input() editMode: boolean;
  @Input() studentData: Student;
  @Input() title: string;
  @Input() visible: string;

  private studentDataCopy: Student;

  private noDataChange = () => this.editStudentForm.pristine;

  constructor(
    private editStudentModal: NgbActiveModal,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.studentDataCopy = new Student(this.editMode ? this.studentData : null);
  }

  public onSave() {
    this.editStudentForm.ngSubmit.emit();
    if (this.editStudentForm.valid) {
      if (this.editMode) {
        this.studentService.updateStudent(this.studentDataCopy).subscribe(
          () => {
            this.onSuccess();
          },
          (err) => this.onFailure(err)
        );
      } else {
        this.studentService.createStudent(this.studentDataCopy).subscribe(
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
    this.studentDataCopy = new Student(this.studentData);
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
    this.editStudentModal.close();
    Swal.fire('Enhorabuena!', 'Registro guardado exitosamente.', 'success');
  }
}
