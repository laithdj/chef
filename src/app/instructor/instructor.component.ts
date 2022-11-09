import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../common/services/auth.service';
import _NAVLIST from './instrutor-dashboard-data';
import _M_NAVLIST from './instrutor-m-dashboard-data';
import { PublicProfileDialogComponent } from '../common/modules/layout/header/public-profile-dialog/public-profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss'],
})
export class InstructorComponent implements OnInit {
  NAVLIST = _NAVLIST;
  M_NAVLIST = _M_NAVLIST;

  selectedMenuIndex = -1;

  subMenuSelectedindex = -1;
  subMenuToggle = false;
  toggleMobileMenu = false;

  loggedUser:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private auth:AuthService, private toaster:ToastrService,public dialog:MatDialog) {}

  ngOnInit(): void {
    this.loggedUser = this.auth.getUser().value;
    console.log('looged ',this.loggedUser);
    // select submenu for default selected route (default select on reload)
    try {
      let r = this.router.url.split('/')[2];
      this.selectedMenuIndex = this.NAVLIST.findIndex((x) => x.url === r);
    } catch (e) {}
  }

  getMNavelist() {
    return [...this.M_NAVLIST].slice(1);
  }

  toggleMoblieMenu(){
    this.toggleMobileMenu = !this.toggleMobileMenu;
    this.subMenuToggle = false;
  }

  toggleMobleMainRoute(index: number) {
    this.selectedMenuIndex = index;
  }

  closeSubmenu() {
    this.subMenuToggle = false;
  }

  toggleMobileSubmenu(index: number, isExpandable: boolean) {
    if (isExpandable) {
      this.subMenuToggle = true;
      this.subMenuSelectedindex = index;
    }
  }

  subMenuHandler(index: number) {
    this.selectedMenuIndex = index;
  }
  onLogout(){
    this.auth.logout().subscribe({
      next: (res) => {
        this.auth.removeUser();
        this.toaster.success('Logged out successfully', '', { timeOut: 2000, closeButton: true });
        this.router.navigate(['/']);

      },
      error: (err) => {  
        console.error(err.error.message);
        this.toaster.error('Error while logging out', '', { timeOut: 2000, closeButton: true });
      },
    });
  }

  openDialog(){
    this.dialog.open(PublicProfileDialogComponent,{
      width:'30%',
      height:'70%'
    })
  }
}
