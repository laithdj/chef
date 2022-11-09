import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-public-profile-dialog',
  templateUrl: './public-profile-dialog.component.html',
  styleUrls: ['./public-profile-dialog.component.scss']
})
export class PublicProfileDialogComponent implements OnInit {

 
  data:any;
  name:any;
  mail:any;
  role:any;

  constructor(private userService:AuthService) { }

  ngOnInit(): void {
    this.userData();
  }

  userData(){
    this.userService.UserDetails().subscribe({
      next:(res)=>{
        this.data = res;
        this.name=this.data.name;
        this.mail=this.data.email;
        this.role=this.data.role;
        console.log(this.data)
       
      },
      error:(err)=>{
        alert('Error while fetching the records');
      }
    });

}
}