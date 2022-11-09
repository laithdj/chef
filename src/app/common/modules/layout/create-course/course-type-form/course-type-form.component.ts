import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-type-form',
  templateUrl: './course-type-form.component.html',
  styleUrls: ['./course-type-form.component.scss']
})
export class CourseTypeFormComponent implements OnInit {
  @Input() courseType: string;
  @Output() onTypeChange = new EventEmitter<string>();

  typeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.typeForm = this.formBuilder.group({
      type: [this.courseType, Validators.required]
    });

    this.typeForm.valueChanges.subscribe((x)=>{
      this.onTypeChange.emit(x.type);
    })
  }
}
