import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/common/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  courses: any[]=[];

  ngOnInit(): void {
    this.getCourseList();

  }


  getCourseList(){
    this.courseService.getInstructorCourses().subscribe({
      next: (res: any)=>{
        this.courses = res.courses;
      },
      error: (err)=>{
        console.log(err);
        alert(err?.error?.message)
      }
    })
  }

}
