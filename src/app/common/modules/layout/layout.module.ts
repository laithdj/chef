import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from '../core/core.module';
import { CatagorySummaryComponent } from './catagory-summary/catagory-summary.component';
import { CourseListComponent } from './course-list/course-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { ExpanableContainerComponent } from './expanable-container/expanable-container.component';
import { CourseTypeFormComponent } from './create-course/course-type-form/course-type-form.component';
import { CourseTitleFormComponent } from './create-course/course-title-form/course-title-form.component';
import { CourseCatagoryFormComponent } from './create-course/course-catagory-form/course-catagory-form.component';
import { CourseTimeFormComponent } from './create-course/course-time-form/course-time-form.component';
import { ManageCourseBlogComponent } from './manage-course-components/manage-course-blog/manage-course-blog.component';
import { LectureEntryComponent } from './manage-course-components/curriculam/lecture-entry/lecture-entry.component';
import { AddChapterComponent } from './manage-course-components/curriculam/add-chapter/add-chapter.component';
import { AddLectureComponent } from './manage-course-components/curriculam/add-lecture/add-lecture.component';
import { CourseMediaplayerComponent } from './course-mediaplayer/course-mediaplayer.component';
import { PublicProfileDialogComponent } from './header/public-profile-dialog/public-profile-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CatagorySummaryComponent,
    CourseListComponent,
    NavbarComponent,
    CourseCardComponent,
    FilterListComponent,
    ExpanableContainerComponent,
    CourseTypeFormComponent,
    CourseTitleFormComponent,
    CourseCatagoryFormComponent,
    CourseTimeFormComponent,
    ManageCourseBlogComponent,
    LectureEntryComponent,
    AddLectureComponent,
    AddChapterComponent,
    CourseMediaplayerComponent,
    PublicProfileDialogComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],

  exports: [
    HeaderComponent,
    FooterComponent,
    CatagorySummaryComponent,
    CourseListComponent,
    CourseCardComponent,
    NavbarComponent,
    FilterListComponent,
    ExpanableContainerComponent,
    CourseTypeFormComponent,
    CourseTitleFormComponent,
    CourseCatagoryFormComponent,
    CourseTimeFormComponent,
    ManageCourseBlogComponent,
    LectureEntryComponent,
    AddLectureComponent,
    AddChapterComponent,
    CourseMediaplayerComponent,
  ],
})
export class LayoutModule {}
