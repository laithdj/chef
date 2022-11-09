import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/common/services/auth.service';
import { CouponService } from 'src/app/common/services/coupon.service';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import{MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-generate-promo-code',
  templateUrl: './generate-promo-code.component.html',
  styleUrls: ['./generate-promo-code.component.scss'],
})
export class GeneratePromoCodeComponent implements OnInit {
  coupenForm: FormGroup;
  formTitle:string=" Add Coupen Information"
  actionButton:string="ADD"
  data: string;
  coupen_code:string=Math.random().toString(36).substring(2);

  constructor(
    private formbuilder: FormBuilder,
    private userService: AuthService,
    private couponService:CouponService,
    public dialogRef:MatDialogRef<GeneratePromoCodeComponent>,
    private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public editCoupenData:any
    
  ) {
    this.coupenForm = this.formbuilder.group({
      channel_id: ['',Validators.required],
      Coupen_name: ['',Validators.required],
      discount: ['', Validators.required],
      blacklisted: ['', Validators.required],
      Expiry_date:['',Validators.required],
      promo_code: [this.coupen_code, Validators.required]
    });
    
    this.coupenForm.controls['promo_code'].disable();


  }



  ngOnInit(): void {
  
    this.userData();
    if(this.editCoupenData){
      this.data=this.editCoupenData.blacklisted.toString();
      this.actionButton='Update';
      this.formTitle='update coupen Information';
      this.coupenForm.controls['channel_id'].setValue(this.editCoupenData.channel_id);
      this.coupenForm.controls['Coupen_name'].setValue(this.editCoupenData.Coupen_name);
      this.coupenForm.controls['discount'].setValue(this.editCoupenData.discount);
      this.coupenForm.controls['blacklisted'].setValue(this.data);
      this.coupenForm.controls['Expiry_date'].setValue(this.editCoupenData.Expiry_date);
      this.coupenForm.controls['promo_code'].setValue(this.editCoupenData.promo_code);
      this.coupenForm.controls['promo_code'].disable();
      this.coupenForm.controls['Coupen_name'].disable();


    }
    
  }
  userData() {
    this.userService.UserDetails().subscribe({
      next: (res:any) => {
        this.coupenForm.controls['channel_id'].setValue(res?.id);

      },
      error: (err) => {
        this.toastr.error('Error while fetching the record', '', { timeOut: 2000, closeButton: true });
      },
    });
  }


  addCoupen() {
    if(!this.editCoupenData){
      this.coupenForm.controls['promo_code'].enable();
      if(this.coupenForm.valid){
        console.log('info :', this.coupenForm.value);
        this.couponService.createCoupon(this.coupenForm.value).subscribe({
        next:(res)=>{
        console.log('res: ', res);
        // alert("Data inserted successfully");
        this.toastr.success('Data inserted successfully', '', { timeOut: 1500, closeButton: true, });
        this.coupenForm.reset();
        this.dialogRef.close('ADD');
       
      },error:()=> {
        this.toastr.error('Error while adding the data', '', { timeOut: 2000, closeButton: true });
      }
      });

      }
    }
    else
    this.updateCoupen();
  }


  updateCoupen()
    { 
      this.couponService.updateCoupon(this.editCoupenData.id,this.coupenForm.value).subscribe({
        next:(res:any)=>
        {
          this.toastr.success('Data updated successfully', '', { timeOut: 1500, closeButton: true, });
          this.coupenForm.reset();
          this.dialogRef.close('UPDATE');
        },
        error:()=>
        {
          this.toastr.error('Error while updating coupen data', '', { timeOut: 2000, closeButton: true });
        }
        });
      }


}