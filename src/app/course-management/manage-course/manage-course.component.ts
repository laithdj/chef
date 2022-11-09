import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _NAVBAR from './manage-course-sidenav-data';
import { ManageCourseService } from './manage-course.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss'],
})
export class ManageCourseComponent implements OnInit {
  NAVBAR = _NAVBAR;

  constructor(private manageCourseService: ManageCourseService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    this.manageCourseService.courseId = id;
  }

  save() {
    this.manageCourseService.save();
  }

  isInvalid(){
    return  !this.manageCourseService.isValid()
  }

}
