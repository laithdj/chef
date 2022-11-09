import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../common/services/auth.service';
import { CourseService } from '../common/services/course.service';
import { SubscriptionService } from '../common/services/subscription.service';
import { CourseMediaplayerComponent } from 'src/app/common/modules/layout/course-mediaplayer/course-mediaplayer.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  subscriptionCourse:any[] = [];
  course: any;
  chapters: 0;
  lectures: 0;

  courses:any[] = [];
  constructor(private _subScription:SubscriptionService, private _toaster:ToastrService,
    private _auth:AuthService, private _course:CourseService,
    public dialog: MatDialog,
    
    ) { 
      this.subscriptionCourse = [];
    }

  ngOnInit(): void {  
    this.isLogged();
  }
  isLogged(){
    if(!this._auth.isLoggedIn()){
      this._toaster.warning('You have to Logged in.','', { timeOut: 2000, closeButton: true })
      return;
    }
    this.loadSubscribedCourses();
  }

  loadSubscribedCourses(){
    this._subScription.getSubscriptionByStudentId().subscribe({next: (res:any)=>{
      console.log('res ', res);
      this.subscriptionCourse = res.subscription;
      this.loadAllSubscibedCourses();

    },error: (err)=>{
        console.log('error : ', err, 'Err : ', err?.statusText);
        this._toaster.error(err?.statusText)
    }})
  }

  loadAllSubscibedCourses(){
    this.courses = [];
    this.subscriptionCourse?.forEach((e:any) =>{
      console.log(e?.courseId)
      this.getCourse(e?.courseId)

    })
  }

  getCourse(courseId:string){
    this._course.getCourse(courseId).subscribe({next: (res:any)=>{
      console.log('course : ', res);
      this.course = {
        ...res.course,
        description: res?.course?.description.replaceAll('&lt;', '<'),
      };
      this.courses.push(this.course)

      this.chapters = this.course?.curriculam?.length || 0;
      this.lectures = this.course.curriculam?.reduce(
        (a: number, b: any) => a + (b.lectures.length || 0),
        0
      );
      console.log('toal lect ', this.lectures);
      console.log('all course ', this.courses);
    }, error: (err)=>{
      console.log('err ', err);
      this._toaster.error(err?.statusText)
    }
  })  }

  scrolled = false;

  playVideo(lecture: any) {
    if(!this._auth.isLoggedIn()){
      this._toaster.warning('You have to logged in for playing.');
      return;
    }
    const dialogRef = this.dialog.open(CourseMediaplayerComponent, {data:lecture});
  }


  

}
