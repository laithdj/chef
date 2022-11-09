import { Component, OnInit } from '@angular/core';
import { ManageCourseService } from '../manage-course.service';
import { CourseService } from 'src/app/common/services/course.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/common/services/auth.service';


@Component({
  selector: 'app-course-prices',
  templateUrl: './course-prices.component.html',
  styleUrls: ['./course-prices.component.scss']
})
export class CoursePricesComponent implements OnInit {

  prices:number=0;
  loggedUser:any;
  constructor(private manageCourseService: ManageCourseService, private courseService:CourseService,
    private toster:ToastrService, private auth:AuthService) { }
  ngOnInit(): void {
    // this.getCourse();
    this.loggedUser = this.auth.getUser().value;
    this.prices = this.loggedUser?.channelPrice;

  }
  
  savePrice(value:string)
  {
    this.updatePrice(parseInt(value))
  }
  // exist was by course wise price..
  /*
  getCourse(){
    const courseId = this.manageCourseService.courseId;
    this.courseService.getBasicInfo(courseId).subscribe({
      next: (res:any) =>{
        console.log(res);
        this.prices = res?.basicInfo.price;
    },
    error: (err)=>{
      console.log(err);
      // alert(err?.message);
      this.toster.error(err?.statusText);
    }
  })
  }
  */

  updatePrice = (price:number) => {
    console.log('update : ', this.loggedUser.id);
    // const courseId = this.manageCourseService.courseId;
    const _id = this.loggedUser.id;

    this.auth.updatePrice(_id,price)
    .subscribe({
      next: (res:any)=>{
        console.log('res : ', res);
        if(res.channelPrice!=-1){
          this.toster.success('Added Successfully.')
        }
      },
      error:(err)=>{
        console.log(err);
        // alert(err?.message);
      this.toster.error(err?.statusText);
      },
    })

    // if course wise price then this will be used.
    /*
    this.courseService.updatePrice(courseId,price)
    .subscribe({
      next: (res:any)=>{
        console.log('res : ', res);
        if(res.price){
          this.toster.success('Added Successfully.')
        }
      },
      error:(err)=>{
        console.log(err);
        // alert(err?.message);
      this.toster.error(err?.statusText);
      },
    })
    */
  };

}
