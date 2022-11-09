import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChapterService } from 'src/app/common/services/chapter.service';

@Component({
  selector: 'add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss'],
})
export class AddChapterComponent implements OnInit {
  @Input() courseId: string;
  @Input() position: number;

  form: FormGroup;

  @Output() newChapter = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private chapterService: ChapterService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [, [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleFlag = false;

  toggleContent() {
    this.toggleFlag = !this.toggleFlag;
  }

  cancelHandler() {
    this.toggleFlag = false;
  }

  addNewChapter() {

    if (this.form.invalid) return;

    this.chapterService
      .addChapter({
        ...this.form.value,
        courseId: this.courseId,
        order: this.position,
      })
      .subscribe({
        next: (res: any) => {
          this.newChapter.emit(res.chapter);
          this.toggleFlag = false;
        },
        error: (err) => {
          console.log(err);
          alert(err?.error?.message);
          this.cancelHandler();
        },
      });
  }
}
