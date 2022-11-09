import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Observer, Subscriber } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/common/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchCourse(params['search'])
    });
  }

  courses: any[] = [];
  query = '';

  laoding = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {}

  searchCourse(query: string) {
    if (this.laoding || !query) return;

    this.courseService.searchCourse(query).subscribe({
      next: (res: any) => {
        this.courses = res.courses;
        this.laoding = false;
        this.query =res.query
      },
      error: (err) => {
        this.laoding = false;
        console.log(err);
      },
    });
  }
}
