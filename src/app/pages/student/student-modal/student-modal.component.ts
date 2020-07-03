import Swal from 'sweetalert2';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StudentService } from '../../../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css'],
})
export class StudentModalComponent implements OnInit {
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StudentModalComponent>,
    private studentService: StudentService,
    private fb: FormBuilder,
    //@Inject(MAT_DIALOG_DATA) { name, lastname, email, age }: Student
  ) {}

  ngOnInit(): void {}

  private createForm() {
    this.form = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onClear() {
    this.form.reset();
    this.createForm();
    this.onSuccess();
  }

  public onSubmit() {
    if (this.form.valid) {
      if (!this.form.get('_id').value)
        this.studentService.createStudent(this.form.value);
      else this.studentService.updateStudent(this.form.value);
      this.form.reset();
      this.createForm();
      this.onClose();
    }
  }

  public onClose() {
    this.form.reset();
    this.createForm();
    this.dialogRef.close();
  }

  public onSuccess() {
    Swal.fire('Enhorabuena!', 'Registro guardado exitosamente.', 'success');
  }
}
