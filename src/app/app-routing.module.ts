import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: `home`,
    loadChildren: () =>
      import('./pages/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: `student-details/:_id`,
    loadChildren: () =>
      import('./pages/student/student-details/student-details.module').then(
        (m) => m.StudentDetailsModule
      ),
  },
  {
    path: `courses`,
    loadChildren: () =>
      import('./pages/course/course.module').then((m) => m.CourseModule),
  },
  { path: ``, redirectTo: `home`, pathMatch: `full` },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
