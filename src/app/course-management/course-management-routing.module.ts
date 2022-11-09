import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from './course-management.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';

const routes: Routes = [{
    path: '',
    component: CourseManagementComponent,
    children:[
      { path:'create', component: CreateCourseComponent},
      { path:':id/manage', loadChildren: ()=> import('./manage-course/manage-course.module').then(m=>m.ManageCourseModule)},
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseManagementRoutingModule { }
