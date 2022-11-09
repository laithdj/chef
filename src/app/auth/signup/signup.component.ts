import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, tokenTypes } from 'src/app/common/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  check:any;
  constructor(private authSetvice: AuthService,
              private formBuilder: FormBuilder, 
              private router: Router,
              private toastr:ToastrService) { }

  signUpform : FormGroup;
  ngOnInit(): void {
    this.signUpform = this.formBuilder.group({
      name: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      email: [null,[ Validators.required,Validators.email]],
    });
  }

name:boolean=true;
password:boolean=true;
email:boolean=true;
  signup(){
      // this.signUpform.controls['name'].getError();
    // console.log(this.signUpform.controls['name'].errors)
    if(this.signUpform.controls['name'].errors){
      // alert("Some field Are Missing");
      // this.toastr.error('Some fields are missing..', '', { timeOut: 2000, closeButton: true });
      this.name=false;
      // return;
    }
    else
    this.name=true;
    if(this.signUpform.controls['password'].errors){
      // alert("Some field Are Missing");
      // this.toastr.error('Some fields are missing..', '', { timeOut: 2000, closeButton: true });
      
      this.password=false;

      // return;
    }
    else 
    this.password=true;
    if(this.signUpform.controls['email'].errors){
      // this.toastr.error('Email format are not correct');
      this.email=false;
    }
    else 
    this.email=true;
    
    console.log(this.signUpform.value)
    this.authSetvice.registerUser(this.signUpform.value).subscribe({
      next: (res: any) => {
        const { tokens } = res;
        this.authSetvice.saveToken(tokenTypes.ACCESS, tokens.access.token);
        this.authSetvice.saveToken(tokenTypes.REFRESH, tokens.refresh.token);
        this.authSetvice.setUser(res.user);
        this.router.navigate(['/']);

        // alert('User Created Successfully');
        this.toastr.success('User Created Successfully', '', { timeOut: 2000, closeButton: true });
      },
      error: (err) => {
        console.error(err);
        // alert(err.error.message);
        // this.toastr.error('Error, While signing Up!', '', { timeOut: 2000, closeButton: true });
        //  this.toastr.error('Some fields are missing..', '', { timeOut: 2000, closeButton: true });
      },
    });
  }

}
