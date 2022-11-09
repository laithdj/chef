import { Component, OnInit } from '@angular/core';
import { CatagoryService } from 'src/app/common/services/catagory.service';
import { ChapterService } from 'src/app/common/services/chapter.service';
import { CourseService } from 'src/app/common/services/course.service';
import { ManageCourseService } from '../manage-course.service';

@Component({
  selector: 'app-course-curriculam',
  templateUrl: './course-curriculam.component.html',
  styleUrls: ['./course-curriculam.component.scss'],
})
export class CourseCurriculamComponent implements OnInit {
  chapters: any[] = [];

  courseId = '';

  constructor(
    private manageCourseService: ManageCourseService,
    private chapterService: ChapterService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseId = this.manageCourseService.courseId;
    this.getCurriculam();
  }

  getCurriculam() {
    this.courseService.getCurriculam(this.courseId).subscribe({
      next: (res: any) => {
        this.chapters = res?.chapters;
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  newChapterHandler(e: any) {
    this.chapters.splice(e.order, 0, {
      ...e,
      lectures: [],
    });
  }

  deleteChapter(index: number) {
    let chapter = this.chapters[index];

    this.chapterService.deleteChapter(chapter.id).subscribe({
      next:(res:any)=>{
        this.chapters.splice(index, 1);
      },
      error:(err)=>{
        alert(err.error.message)
      }
    })
  }

  deleteLectureHandler(e: any) {
    this.chapters[e.chapterPosition].lectures.splice(e.position, 1);
  }

  newLectureHandler(e: any) {
    this.chapters[e.chapterPos].lectures.splice(e.order, 0, e);
  }
}
