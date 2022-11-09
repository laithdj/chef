import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { InstructorGuard } from './common/guards/instructor.guard';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';

const routes: Routes = [
  // Main Application (Home/Search result Pages)
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },

  // Authentication Module
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },

  //instructor module
  {
    path: 'instructor',
    loadChildren: () =>
      import('./instructor/instructor.module').then((m) => m.InstructorModule),
    canLoad: [InstructorGuard],
    canActivate: [InstructorGuard],
  },

  //student module
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },

  //course management (CRUD)
  {
    path: 'library',
    loadChildren: () =>
      import('./course-management/course-management.module').then(
        (m) => m.CourseManagementModule
      ),
    // canLoad: [InstructorGuard],
    // canActivate: [InstructorGuard],
  },

  //+++++++++++++++++++++++++++++++++++++++++ Dashboard +++++++++++++++++++++++++++++++++++/
  {
    path: 'main',
    loadChildren: () =>
      import('./main/main.module').then(
        (m) => m.MainModule
      ),
  },

  {
    path:'Icourse/:id',
    component: InstructorCoursesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
