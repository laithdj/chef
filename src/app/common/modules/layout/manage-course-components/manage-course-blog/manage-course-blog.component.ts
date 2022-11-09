import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-manage-course-blog',
  templateUrl: './manage-course-blog.component.html',
  styleUrls: ['./manage-course-blog.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ManageCourseBlogComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitleHeading: string = '';
  @Input() subtitleDescription: string = '';
  @Input() subtitleBloglink: string = '';
  @Input() cardHeading: string = '';
  @Input() cardDescription: string = '';
  @Input() cardImgPath: string = '';
  @Input() cardBtnTitle: string = '';

  constructor() {}

  ngOnInit(): void {}
}
