import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { MaterialModule } from '../../components/material/material.module';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentModalComponent } from './student-modal/student-modal.component';

@NgModule({
  declarations: [StudentComponent, StudentDetailsComponent, StudentModalComponent],
  imports: [CommonModule, StudentRoutingModule, MaterialModule],
})
export class StudentModule {}
