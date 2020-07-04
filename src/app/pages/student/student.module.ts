import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentModalComponent } from './student-modal/student-modal.component';
import { StudentDetailsModule } from './student-details/student-details.module';

@NgModule({
  declarations: [
    StudentComponent,
    StudentDetailsComponent,
    StudentModalComponent,
  ],
  imports: [CommonModule, StudentRoutingModule, FormsModule, StudentDetailsModule, NgxSpinnerModule],
  entryComponents: [StudentModalComponent],
})
export class StudentModule {}