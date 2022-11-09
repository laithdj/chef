import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  mediaTypes, publicMediaUrlGenrator } from 'src/app/common/services/media.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input('mode') mode = 'horizontal';

  @Input() data: any={};
  constructor(private router: Router) {}

  image=''
  
  vertical = false;
  ngOnInit(): void {
    this.image = publicMediaUrlGenrator(mediaTypes.courseImage, this.data?.id || '');
  }

  onSelect() {
    this.router.navigate([`./course/${this.data?.id}`]);
  }
}
