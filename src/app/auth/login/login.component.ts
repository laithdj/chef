import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, tokenTypes } from 'src/app/common/services/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private forBuilder: FormBuilder,
              private toastr:ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.forBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required,Validators.minLength(8)]]
    })
  }



  login(){

    if(this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any)=>{
        const {tokens, user} = res;

        this.authService.saveToken(tokenTypes.ACCESS, tokens.access.token);
        this.authService.saveToken(tokenTypes.REFRESH, tokens.refresh.token);
        this.authService.setUser(user);
        this.toastr.success('Logged In Successfully', '', { timeOut: 2000, closeButton: true });
        this.router.navigate(['/']);
      },
      error: (err)=>{
        console.log(err);
        // alert(err.error.message);
        this.toastr.error('Invalid Credentials', '', { timeOut: 2000, closeButton: true });
      }
    })
  }
}
