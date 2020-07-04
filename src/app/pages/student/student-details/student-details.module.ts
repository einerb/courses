import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { StudentDetailsRoutingModule } from './student-details-routing.module';
import { AssignModalComponent } from '../assign-modal/assign-modal.component';

@NgModule({
  declarations: [AssignModalComponent],
  imports: [CommonModule, StudentDetailsRoutingModule, FormsModule, NgxSpinnerModule],
  entryComponents: [AssignModalComponent],
})
export class StudentDetailsModule {}
