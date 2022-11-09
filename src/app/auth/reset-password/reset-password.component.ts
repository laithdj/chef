import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm :FormGroup;

  private token! : string;

  constructor(private activatedroute: ActivatedRoute,
              private formBuilder: FormBuilder,  
              private authService: AuthService,
              private toastr:ToastrService) {}


  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(x=>{
      this.token = x.get('token') || ''; 
    });

    this.resetPasswordForm  = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }


  resetPassword(){

    console.log(this.resetPasswordForm.value);
    
    if(this.resetPasswordForm.invalid){
      // alert("INvlaid password")
      this.toastr.error('Invalid Password', '', { timeOut: 2000, closeButton: true });
      return;
    }

    this.authService.resetPassword(this.token, this.resetPasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        // alert("password changed");
        this.toastr.success('Password Changed..', '', { timeOut: 2000, closeButton: true });

      },
      error: (err)=>{
        console.error(err);
        // alert(err.error.message);
        this.toastr.success('Error While resetting Password..', '', { timeOut: 2000, closeButton: true });
      }
    })

  }
}
