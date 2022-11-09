import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './common/modules/core/core.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './common/modules/layout/layout.module';
import { CourseManagementComponent } from './course-management/course-management.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './common/interceptors/jwt.interceptor';
import { AuthService } from './common/services/auth.service';

//toastr
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';


export function init_app(authService:AuthService) {
  return () => authService.loadUserDetails();
}

@NgModule({
  declarations: [AppComponent, CourseManagementComponent, InstructorCoursesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutModule,
    ToastrModule.forRoot()

  ],
  providers: [
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
