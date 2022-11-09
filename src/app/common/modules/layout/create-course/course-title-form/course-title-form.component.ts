import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-title-form',
  templateUrl: './course-title-form.component.html',
  styleUrls: ['./course-title-form.component.scss']
})
export class CourseTitleFormComponent implements OnInit {
  
  @Input() courseTitle: string;
  @Output() onTitleChange = new EventEmitter<string>();


  titleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.titleForm = this.formBuilder.group({
      title: [this.courseTitle, [Validators.required]],
    });

    this.titleForm.valueChanges.subscribe((x)=>{
      this.onTitleChange.emit(x.title);
    })
  }

}
