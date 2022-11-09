import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null,[Validators.required, Validators.email]]
    })
  }

  forgetPassword(){
    console.log(this.form.value);

    const {email} = this.form.value;

    if(this.form.invalid){
      // alert("invlaid email")
      this.toastr.error('Invalid Email!', '', { timeOut: 2000, closeButton: true });
      return;
    }


    this.authService.forgetPassword(email).subscribe({
      next: (res: any)=>{
        console.log(res);
        // alert("Reset email is sent")
        this.toastr.warning('Reset Email is send...', '', { timeOut: 2000, closeButton: true });
      },
      error: (err)=>{
        console.error(err);
        // alert(err.error.message);
        this.toastr.error('Error! while Reseting', '', { timeOut: 2000, closeButton: true });
      }
    })
  }

}
