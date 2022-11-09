import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LectureService } from 'src/app/common/services/lecture.service';

@Component({
  selector: 'add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss'],
})
export class AddLectureComponent implements OnInit {
  @Input() position: number;
  @Input() chapterPosition: number;
  @Input() courseId: string;
  @Input() chapterId: string;

  form: FormGroup;

  @Output() newLecture = new EventEmitter<any>();

  toggleFlag = false;

  constructor(
    private formBuilder: FormBuilder,
    private lectureService: LectureService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [, [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleContent() {
    this.toggleFlag = !this.toggleFlag;
  }

  cancelHandler() {
    this.toggleFlag = false;
  }

  addNewLecture() {
    console.log(this.form.value);

    if (this.form.invalid) return;

    this.lectureService
      .addLecture({
        ...this.form.value,
        order: this.position,
        courseId: this.courseId,
        chapterId: this.chapterId,
      })
      .subscribe({
        next: (res: any) => {
          this.newLecture.emit({...res.lecture, chapterPos: this.chapterPosition});
          this.toggleFlag = false;
        },
        error: (err) => {
          console.log(err);
          alert(err?.error?.message);
        },
      });
  }
}
