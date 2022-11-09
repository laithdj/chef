import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../common/services/auth.service';
import { CourseService } from '../common/services/course.service';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {

  iCourse:any;
  author:any;
  constructor(  private _auth:AuthService,private _toaster:ToastrService, private _course:CourseService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    this.isLogged();
    this.Courses(id);
 
  }

  isLogged(){
    if(!this._auth.isLoggedIn()){
      this._toaster.warning('You have to Logged in.','', { timeOut: 2000, closeButton: true })
      return;
    }
    // this.Courses();
  }


  Courses(id:any){

    this._course.Course(id).subscribe(
      {next: (res:any)=>{
      console.log('res ',res);
      this.iCourse = res.courses;
      this.author=this.iCourse[0].author;
      // this.loadAllSubscibedCourses();

    },error: (err)=>{
        console.log('error : ', err, 'Err : ', err?.statusText);
        this._toaster.error(err?.statusText)
    }})
  }

  // loadAllSubscibedCourses(){
  //   this.courses = [];
  //   this.subscriptionCourse?.forEach((e:any) =>{
  //     console.log(e?.courseId)
  //     this.getCourse(e?.courseId)

  //   })
  // }

  // getCourse(courseId:string){
  //   this._course.getCourse(courseId).subscribe({next: (res:any)=>{
  //     console.log('course : ', res);
  //     this.course = {
  //       ...res.course,
  //       description: res?.course?.description.replaceAll('&lt;', '<'),
  //     };
  //     this.courses.push(this.course)

  //     this.chapters = this.course?.curriculam?.length || 0;
  //     this.lectures = this.course.curriculam?.reduce(
  //       (a: number, b: any) => a + (b.lectures.length || 0),
  //       0
  //     );
  //     console.log('toal lect ', this.lectures);
  //     console.log('all course ', this.courses);
  //   }, error: (err)=>{
  //     console.log('err ', err);
  //     this._toaster.error(err?.statusText)
  //   }
  // })  }

  // scrolled = false;

  

}
