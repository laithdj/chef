import { Component, OnInit } from '@angular/core';
import _DATA from '../shared/blogs-data';

@Component({
  selector: 'app-course-structure',
  templateUrl: './course-structure.component.html',
  styleUrls: ['./course-structure.component.scss'],
})
export class CourseStructureComponent implements OnInit {
  constructor() {}
   DATA= _DATA.CourseStructure;

  ngOnInit(): void {}
}
