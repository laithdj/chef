import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-time-form',
  templateUrl: './course-time-form.component.html',
  styleUrls: ['./course-time-form.component.scss']
})
export class CourseTimeFormComponent implements OnInit {

  @Input() time: string;
  @Output() onTimeChange = new EventEmitter<string>();

  timeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.timeForm  =this.formBuilder.group({
      time: [this.time, [Validators.required]]
    })


    this.timeForm.valueChanges.subscribe((x)=>{
      this.onTimeChange.emit(x.time);
    })
  }

}
