import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseBasicsComponent } from './course-basics/course-basics.component';
import { CourseCaptionsComponent } from './course-captions/course-captions.component';
import { CourseCurriculamComponent } from './course-curriculam/course-curriculam.component';
import { CourseGoalsComponent } from './course-goals/course-goals.component';
import { CourseMessagesComponent } from './course-messages/course-messages.component';
import { CoursePricesComponent } from './course-prices/course-prices.component';
import { CourseStructureComponent } from './course-structure/course-structure.component';
import { FilmComponent } from './film/film.component';
import { ManageCourseComponent } from './manage-course.component';
import { PromotionComponent } from './promotion/promotion.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  {
    path: '',
    component: ManageCourseComponent,
    children:[
      {path: 'goals', component: CourseGoalsComponent},
      {path: 'course-structure', component: CourseStructureComponent},
      {path: 'setup', component: SetupComponent},
      {path: 'film', component: FilmComponent},
      {path: 'curriculam', component: CourseCurriculamComponent},
      {path: 'captions', component: CourseCaptionsComponent},
      {path: 'basics', component: CourseBasicsComponent},
      {path: 'pricing', component: CoursePricesComponent},
      // {path: 'promotions', component: PromotionComponent},
      { path:'promotions',loadChildren: ()=> import('./promotion/promotions.module').then(m=>m.PromotionsModule)},
      {path: 'messages', component: CourseMessagesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCourseRoutingModule { }
