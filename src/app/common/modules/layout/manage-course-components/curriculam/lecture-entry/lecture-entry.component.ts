import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LectureService } from 'src/app/common/services/lecture.service';
import { MediaService, mediaTypes } from 'src/app/common/services/media.service';

@Component({
  selector: 'lecture-entry',
  templateUrl: './lecture-entry.component.html',
  styleUrls: ['./lecture-entry.component.scss'],
})
export class LectureEntryComponent implements OnInit {
  @Input() data: any;
  @Input() position: number;
  @Input() chapterPosition: number;
  @Output() delete = new EventEmitter<{chapterPosition: number, position:number}>();

  private _value: number = 0;

  file:File | null;
  contentToggle = false;
  loading = false;

  constructor(private mediaService: MediaService, private lectureService: LectureService) {}

  ngOnInit(): void {}
  

  get value(){
    return this._value;
  }

  set value(val: number){
    if(!isNaN(val) && val<=100){
      this._value=val;
    }
  }

  toggleContent() {
    this.contentToggle = !this.contentToggle;
  }

  onFileChange(e: Event){
    let filelist = (<HTMLInputElement>e.target).files;

    if(filelist?.length){
      this.file = filelist[0];
    }
  }

  deleteFile(){
    this.mediaService.deleteFile(mediaTypes.courseMaterial, {id: this.data.id}).subscribe({
      next:(res)=>{
        this.data.filename = '';
        this.file = null;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  deleteLecture(){
    this.lectureService.deleteLecture(this.data.id).subscribe({
      next:(res: any)=>{
        console.log(res);
        this.delete.emit({ chapterPosition: this.chapterPosition, position: this.position });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  uploadFile(){
    if(! this.file) return;

    let formData = new FormData();
    formData.append('file', this.file);
    this.loading=true;

    this.mediaService.uploadFile(mediaTypes.courseMaterial, formData, {id: this.data.id, courseId: this.data.courseId}, {reportProgress: true, observe:'events'}).subscribe({
      next: (res: any)=>{
        if(res['loaded'] && res['total']){
          this.value = Math.round((res['loaded'] / res['total']) *100);
        }
      },
      error:(err)=>{
        console.log(err);
        this.loading=false;
      },
      complete:()=>{
        this.loading = false;
        this.data.filename = this.file?.name;

      }
    })
  }
}
