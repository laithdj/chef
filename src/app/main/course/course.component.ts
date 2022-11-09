import { Component,HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { CourseService } from 'src/app/common/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseMediaplayerComponent } from 'src/app/common/modules/layout/course-mediaplayer/course-mediaplayer.component';
// import { SubscribeTutorDialogComponent } from './subscribe-tutor-dialog/subscribe-tutor-dialog.component';
import { CheckoutService } from 'src/app/common/services/checkout.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionService } from 'src/app/common/services/subscription.service';
import { DatePipe } from '@angular/common';
import { CouponService } from 'src/app/common/services/coupon.service';



@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  course: any;
  chapters: 0;
  lectures: 0;
  paymentAmount:number=0;

  //coupen
  coupen: Array<any>;
  vcoupen:Array<any>;
  discount_price:any=0;
  coupenId:string;
  coupenApply:boolean=false;
  applyCoupen:any=false;
  paid_price:any;
  discountPerc:any;
  des_coupen:Array<any>;
  // stripe
  paymentHandler: any = null;
  success: boolean = false;
  failure:boolean = false;





    //  stripe secret and public keys
//  MINE ORIGINAL KEYS ACCOUNT (mean email verified)
  
  /*
  STRIPE_PUBLIC_KEY = 'pk_test_51LUDBPCEgzaGK4tHpQ1HdGSXc63O3riL9SREDaFaQcalf7nyEgrFa7G0foeybJ1nlohP0wFVHU9bQ5U6Cc2SMqrG00kOpL5gxD';
  STRIPE_SECRET_KEY = 'sk_test_51LUDBPCEgzaGK4tHZ07qFdNeG8ueHa0V7gCUSxaTMgNLo2NabULIPcVPCwl1cIXR0iZweKhWgDeT64OBV0DbhBMj00ERlH29Ge';
  */
//  mine testAccount keys
  STRIPE_SECRET_KEY = 'sk_live_xcVJiGQs0WBnFZDklPOJ2D0T';
  STRIPE_PUBLIC_KEY = 'pk_live_tIpY6gzUsPPEw87VcUjanwnd';
  

  constructor(
    private router: Router,
    private courseService: CourseService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private checkout: CheckoutService,
    private auth:AuthService,
    private toaster:ToastrService,
    private subService:SubscriptionService,
    private datePipe:DatePipe,
    private coupenService:CouponService
  )
  
  
  {
    this.applyCoupen=false;
    this.des_coupen=[];
  }

  ngOnInit(): void {
 
    const { id } = this.route.snapshot.params;
    this.getCourse(id);
    setTimeout(()=>{
      this.invokeStripe();
      this.loadSubscribe();
    },1000)
   
    // this.invokeStripe();
    // this.loadSubscribe();
  }

  loadSubscribe(){
    this.subService.getSubscriptionByStudentId().subscribe({next: (res:any)=>{
      console.log(res.subscription.length,"LEngth")
      this.subscribe = res?.subscription;
      this.subscribe.forEach((element: any)=>{
        if(this.course?.userId == element.channel_id ){
          this.des_coupen.push(element);
        }
      });

     
      if(this.des_coupen.length!=0 )
      {
      
      // console.log("aini",this.subscribe)
      this.applyCoupen=this.des_coupen[0].CoupenApply;
      this.discount_price=this.des_coupen[0].discountPrice;
      this.paid_price=this.des_coupen[0].paidPrice;
      this.discountPerc=this.des_coupen[0].coupen_perc;
   
      }

    }})
  }
  scrolled = false;

  playVideo(lecture: any) {
    if(!this.auth.isLoggedIn()){
      this.toaster.warning('You have to be logged in for playing.');
      return;
    }
    if(!this.isSubscribed()){
      this.toaster.warning('You don not subscribe this course.');
      return;
    }
    if(!this.isSubscriptionValid()){  // it will return true if time period is still exist.
      this.toaster.warning(`Your Subscription period is End. \nSubscribe Again.`);
      return;
    }
    console.log('playing : ', this.subscriptionResult);
    const dialogRef = this.dialog.open(CourseMediaplayerComponent, {data:lecture});
  }
  isSubscribed(){
    return this.subscriptionResult.length;
  }
  subscriptionValidity:boolean = false;
  isSubscriptionValid():boolean{
    let end:any = this.datePipe.transform(this.subscriptionResult[0]?.end_date, 'yyyy-MM-dd','en_US');
    let now:any = this.datePipe.transform(new Date(), 'yyyy-MM-dd','en_US');

    if(end>now){  // mean still has subscription time period
      this.subscriptionValidity = true;
      return true;
    } 
    else{
      this.subscriptionValidity = false;
      return false; // mean subscription time period end.
    }
  }

   getCourse(id: string) {
    this.courseService.getCourse(id).subscribe({
      next: (res: any) => {
        // console.log('get Course Res :',res);
        this.getSubscriptionByStudentId();    

        this.course = {
          ...res.course,
          description: res?.course?.description.replaceAll('&lt;', '<'),
        };
        console.log('coursePrice :', this.course?.price);
        console.log('Course :', this.course);
        

        /*  
          getting price of a channel
        */
        this.getTutor(this.course?.userId);

        this.chapters = this.course?.curriculam?.length || 0;
        this.lectures = this.course.curriculam?.reduce(
          (a: number, b: any) => a + (b.lectures.length || 0),
          0
        );
        console.log('total lect ', this.lectures);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTutor(userId:any){
    this.auth.getPrice(userId).subscribe({next: (res:any)=>{
      console.log('res ', res);
      this.course.price =  res?.channelPrice;
    }, error: (err)=>{
      console.log('err : ', err);
      this.toaster.error(err.statusText);
    }});
  }

  /*
    here will be use public key., in backend/server side will use private key.
*/
  makePayment(amount: number) {
    if(this.auth.isLoggedIn()==false){
      this.toaster.warning('You Must have to logged in for Subscribe');
      return;
    }
    console.log('amount : ', amount);
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.STRIPE_PUBLIC_KEY,
      locale: 'auto',
      token: function (stripeToken: any) {  // credit card info token
        console.log('stripeToken:',stripeToken);
        paymentstripe(stripeToken,amount);//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      },
    });
 
    const paymentstripe = (stripeToken: any, amount:number) => {
      console.log('amount ', amount);
      this.checkout.makePayment(stripeToken,amount).subscribe((res: any) => {
        console.log('res :',res);
        if (res?.data === "success") {
          // if successfully transfer amount then update table of subscription
          this.create_subscription();

          this.success = true
        }
        else {
          this.failure = true
        }
      });
    };
    
    paymentHandler.open({
      name: 'My Chefo',
      description: 'TESTING MODE. Channel Subsciption for 1 Month',
      amount: amount * 100
    });
  }


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.STRIPE_PUBLIC_KEY,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log('stripe Token : ',stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  start_date = new Date();
  end_date = new Date();
  create_subscription(){
    console.log('in create : ', this.course);
    this.end_date.setMonth(this.start_date.getMonth()+1);

    // if



    // userId will be send by automatically..
    let params = {
      courseId:this.course?._id, 
      channel_id: this.course.userId, 
      couponId: this.coupenId, // this coupon.v+id
      discountPrice:this.discount_price,  // coupon price
      actualPayablePrice:this.course.price,
      paidPrice:this.course.price-this.discount_price, // calcylasreds
      start_date:this.start_date,
      end_date:this.end_date,
      CoupenApply:this.coupenApply,
      coupen_perc:this.discountPerc
    
    }
    console.log(params,"Params")
    this.subService.createSubscription(params).subscribe({next: (res:any)=>{
    
      this.applyCoupen=res.CoupenApply;  
      if(res!==null){
        this.toaster.success('Successfully Subscribed this Channel for 1 Month.');
        this.subscriptionResult.push('1');
        this.subscriptionValidity=true;
      }
    },
    error: (err) => {
      console.log(err);
      this.toaster.error(err?.statusText)
    },
   })
  }
  subscribe: any[] = [];
  subscriptionResult: any[]=[];

  getSubscriptionByStudentId(){
    this.subService.getSubscriptionByStudentId().subscribe({next: (res:any)=>{
      this.subscribe = res.subscription;
      // this.applyCoupen=this.subscribe[0].CoupenApply;
      console.log('subscribe ', this.subscribe);
      console.log('courseId:', this.course._id);
      this.subscriptionResult = this.subscribe?.filter((element:any) =>{
        // return this.course?._id === element.courseId;  // course wise subscription
        // course?.user_id is channel id.
        return this.course?.userId === element?.channel_id; // channel wise.
        
        // console.log('courseUserId : ', this.course.userId, ' channel : ', element.channel_id);
        
      })
      console.log('matched course and sub (Sub scription result): ', this.subscriptionResult);
      this.isSubscriptionValid();
      }, error: (err) =>{
        console.log(err);
        this.toaster.error(err?.statusText)
      }
    })
  }




  // ++++++++++++++++++++++++++++++++++++++ Coupen Validation +++++++++++++++++++++++
  coupen_code(Coupen:any) {
    this.coupen=[];
   this.coupenService.getCoupon(this.course.userId).subscribe({
      next:(res:any)=>
     {         
        res.forEach((element: any)=>{
        this.coupen.push(element);
        })
        // console.log(this.coupen,"aini")  
       this.validation(Coupen);
      }
      ,error:()=> {
        console.log(console.error)
        // this.toastr.error('Error while getting coupen data', '', { timeOut: 2000, closeButton: true });
      }})
  }


  validation(Coupen:any){
    let current_date:any = this.datePipe.transform(new Date(), 'yyyy MMM dd');
    this.vcoupen=[];
    this.coupen.forEach((element: any)=>{
      if(element.promo_code == Coupen && element.blacklisted==false && element.Expiry_date>=current_date)
      {
      this.vcoupen.push(element);
      }

    })
    if(this.vcoupen.length==0){
      console.log("Coupen doesn't Exists OR Expired or may be disabled");
      this.discount_price=0;
      this.coupenApply=false;
    }
    else
    {
      console.log("Coupen Exists");
      this.discount_price=(this.course?.price * (this.vcoupen[0]?.discount/100));
      this.coupenId=(this.vcoupen[0]?.id)
      this.coupenApply=true;
      this.discountPerc=this.vcoupen[0]?.discount;
      this.paid_price=this.course?.price-this.discount_price
     
    }
    // console.log(this.vcoupen[0].id,"aaaaaaaaaa");
  
    // console.log(this.coupenId     ,"Coupen idddddddd")
    
    // console.log(this.discount_price    ,"discount price..........")

       
  }

}
