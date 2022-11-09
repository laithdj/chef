import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mediaTypes, privateMediaUrlGenrator } from 'src/app/common/services/media.service';

@Component({
  selector: 'app-course-mediaplayer',
  templateUrl: './course-mediaplayer.component.html',
  styleUrls: ['./course-mediaplayer.component.scss'],
})
export class CourseMediaplayerComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  video ='';

  ngOnInit(): void {
    console.log(this.data);
    this.video = privateMediaUrlGenrator(this.data.id, {});
  }

  @ViewChild('videoPlayer') videoplayer: ElementRef;

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
}
