import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: `home`,
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: `students`,
    loadChildren: () =>
      import('./pages/student/student.module').then((m) => m.StudentModule),
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
