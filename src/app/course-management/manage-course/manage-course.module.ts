import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCourseRoutingModule } from './manage-course-routing.module';
import { ManageCourseComponent } from './manage-course.component';
import { CoreModule } from 'src/app/common/modules/core/core.module';
import { LayoutModule } from 'src/app/common/modules/layout/layout.module';
import { CourseStructureComponent } from './course-structure/course-structure.component';
import { SetupComponent } from './setup/setup.component';
import { FilmComponent } from './film/film.component';
import { PromotionComponent } from './promotion/promotion.component';
import { CourseMessagesComponent } from './course-messages/course-messages.component';
import { CoursePricesComponent } from './course-prices/course-prices.component';
import { CourseBasicsComponent } from './course-basics/course-basics.component';
import { CourseCaptionsComponent } from './course-captions/course-captions.component';
import { CourseCurriculamComponent } from './course-curriculam/course-curriculam.component';
import { CourseGoalsComponent } from './course-goals/course-goals.component';

import { QuillModule } from 'ngx-quill';
import { PromoCodesComponent } from './promotion/promo-codes/promo-codes.component';

@NgModule({
  declarations: [
    ManageCourseComponent,
    CourseStructureComponent,
    SetupComponent,
    FilmComponent,
    PromotionComponent,
    CourseMessagesComponent,
    CoursePricesComponent,
    CourseBasicsComponent,
    CourseCaptionsComponent,
    CourseCurriculamComponent,
    CourseGoalsComponent,
    PromoCodesComponent,
  ],
  imports: [
    CommonModule,
    ManageCourseRoutingModule,
    CoreModule,
    LayoutModule,
    QuillModule.forRoot(),
  ],
})
export class ManageCourseModule {}
