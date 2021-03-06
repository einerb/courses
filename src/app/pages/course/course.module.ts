import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseModalComponent } from './course-modal/course-modal.component';

@NgModule({
  declarations: [CourseComponent, CourseModalComponent],
  imports: [CommonModule, CourseRoutingModule, FormsModule, NgxSpinnerModule],
  entryComponents: [CourseModalComponent],
})
export class CourseModule {}
