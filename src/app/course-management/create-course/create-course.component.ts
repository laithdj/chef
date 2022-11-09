import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/common/services/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  stepCount = 1;

  courseTitle: string;
  courseCatagory: string;
  courseType: string;
  courseTime: string;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {}

  isInvalid() {
    switch (this.stepCount) {
      case 1:
        return this.courseType ? false : true;
      case 2:
        return this.courseTitle && this.courseTitle.length > 5 ? false : true;
      case 3:
        return this.courseCatagory ? false : true;
      case 4:
        return this.courseTime ? false : true;
      default:
        return true;
    }
  }

  nextStep() {
    this.stepCount++;
  }

  previousStep() {
    this.stepCount--;
  }

  createCourse() {
    this.courseService.createCourse({title:this.courseTitle, catagory: this.courseCatagory, type:this.courseType, time:this.courseTime}).subscribe({
      next: (res:any)=>{
          this.router.navigate([`/library/${res.id}/manage/film`])
      },
      error: console.log
    })
  }

  onCourseTitleChange(title: string) {
    this.courseTitle = title;
  }

  onCourseCatagoryChange(catagory: string) {
    this.courseCatagory = catagory;
  }

  onCourseTimeChange(time: string) {
    this.courseTime = time;
  }

  onCourseTypeChange(type: string) {
    this.courseType = type;
  }
}
