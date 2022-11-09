import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, OperatorFunction } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
  shareReplay,
} from 'rxjs/operators';
import { AuthService, User,tokenTypes } from 'src/app/common/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CatagoryService } from 'src/app/common/services/catagory.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PublicProfileDialogComponent } from './public-profile-dialog/public-profile-dialog.component';

/*
  temp for demo search
*/
const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  },
});

@Injectable()
export class WikipediaService {
  constructor(private router: Router, private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<[any, string[]]>(WIKI_URL, { params: PARAMS.set('search', term) })
      .pipe(map((response) => response[1]));
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [WikipediaService],
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  title = 'chefo-design';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  showHandsetMenu = false;
  showHandsetSearch = false;
  submenuIndex = -1;
  innerSubmenuIndex = -1;
  toggleHandsetProfile = false;

  /*
    temp for demo search
  */
  model: any;
  searching = false;
  searchFailed = false;

  loggedUser:any;


  constructor(
    private router: Router,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private catagoryService: CatagoryService,
    private _service: WikipediaService,
    private toaster:ToastrService,
    public dialog:MatDialog
  ) {
    this.loggedUser = '';
    }
  ngOnInit(): void {
    this.getCatagories();
    this.loggedUser = this.user.value;
  }
  get user() {
    return this.authService.getUser();
  }

  test(index: number) {
    console.log(index);
  }

  catagoiries: any[] = [];

  getCatagories() {
    this.catagoryService.getCatagories().subscribe({
      next: (res: any) => {
        this.catagoiries = res.catagories;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchItem(selectedItem: any) {
    if (selectedItem?.item) {
      this.searchContent(selectedItem.item);
    }
  }

  onEnter(keyword: string) {
    this.searchContent(keyword);
  }

  searchContent(keyword: string) {
    this.showHandsetSearch = false;
    this.router.navigate(['./courses'], {
      queryParams: { search: keyword },
    });
  }

  showHandsetProfileMenu() {
    this.toggleHandsetProfile = true;
  }

  hideHandsetProfileMenu() {
    this.toggleHandsetProfile = false;
  }

  openSubmenu(index: number) {
    this.setSubmenuIndex(index);
    this.closeInnerMenu();
  }

  openInnerSubmenu(index: number) {
    this.setInnerSubmenuIndex(index);
  }

  toggleHandsetMenu() {
    this.showHandsetMenu = !this.showHandsetMenu;
  }

  toggleHandsetSearch() {
    this.showHandsetSearch = !this.showHandsetSearch;
  }

  setSubmenuIndex(index: number) {
    this.submenuIndex = index;
  }

  setInnerSubmenuIndex(index: number) {
    this.innerSubmenuIndex = index;
  }

  closeSubmenu() {
    this.setSubmenuIndex(-1);
  }

  closeSubMenues() {
    this.closeSubmenu();
    this.closeInnerMenu();
  }

  closeInnerMenu() {
    this.setInnerSubmenuIndex(-1);
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this._service.search(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );
    onLogout(){
      this.authService.logout().subscribe({
        next: (res) => {
          this.authService.removeUser();
          this.toaster.success('Logged out successfully', '', { timeOut: 2000, closeButton: true });
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
