import { Component, OnInit } from '@angular/core';
import { GeneratePromoCodeComponent } from './generate-promo-code/generate-promo-code.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/common/services/auth.service';
import { CouponService } from 'src/app/common/services/coupon.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promo-codes',
  templateUrl: './promo-codes.component.html',
  styleUrls: ['./promo-codes.component.scss']
})
export class PromoCodesComponent implements OnInit {

  user_id:any;
  coupen: Array<any>;


  constructor(public dialog: MatDialog,
    private userService: AuthService,
    private couponService:CouponService,
    private toastr:ToastrService) {
      this.coupen=[]
     }

  ngOnInit(): void {
    this.getuserData();
    // this.getCoupen();
  }

  openDialog(){
    this.dialog.open(GeneratePromoCodeComponent,{
      width:'40%',
      height:'80%'
    }).afterClosed().subscribe(value=>{
      if(value === 'ADD'){
      //  console.log(value)
        this.getuserData();
      }
    })
  }

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  editCoupenData(row:any)
  {
    this.dialog.open(GeneratePromoCodeComponent,{
    
      width:'40%',
      height:'80%',
      data:row
      
    }).afterClosed().subscribe(value=>{
      if(value === 'UPDATE'){
        this.getuserData();
      }
    })
  }


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getuserData() {
    this.coupen=[];
    this.userService.UserDetails().subscribe({next: (res:any) => {this.couponService.getCoupon(res?.id).subscribe({
          next:(res:any)=>
         {         
            res.forEach((element: any)=>{
              this.coupen.push(element);
            })  
           console.log(this.coupen,"COUPEN")
          }
          ,error:()=> {
            console.log(console.error)
            this.toastr.error('Error while getting coupen data', '', { timeOut: 2000, closeButton: true });
          }})
      },
    });
  }










}
