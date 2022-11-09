import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseManagementRoutingModule } from './course-management-routing.module';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CoreModule } from '../common/modules/core/core.module';
import { LayoutModule } from '../common/modules/layout/layout.module';


@NgModule({
  declarations: [  
    CreateCourseComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    CourseManagementRoutingModule
  ]
})
export class CourseManagementModule { }
