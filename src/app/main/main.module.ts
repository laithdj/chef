import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { CoreModule } from './../common/modules/core/core.module';
import { LayoutModule } from '../common/modules/layout/layout.module';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';




@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    CoursesComponent,
    CourseComponent,
 
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    CoreModule,
    LayoutModule
  ]
})
export class MainModule { }
