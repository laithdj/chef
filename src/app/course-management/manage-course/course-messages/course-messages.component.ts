import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/common/services/course.service';
import { fillForm } from 'src/app/common/utils/formGroupUpdater';
import { ManageCourseService } from '../manage-course.service';

@Component({
  selector: 'app-course-messages',
  templateUrl: './course-messages.component.html',
  styleUrls: ['./course-messages.component.scss'],
})
export class CourseMessagesComponent implements OnInit, OnDestroy {
  messageForm: FormGroup;

  loading = false;

  constructor(
    private manageCourseService: ManageCourseService,
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      welcome: [, Validators.required],
      congrats: [, Validators.required],
    });

    this.getMessages();


    Promise.resolve().then(() => {
      this.manageCourseService.save = this.updateMessages;
      this.manageCourseService.isValid = this.isValid;
    });
  }

  ngOnDestroy(): void {
    this.manageCourseService.removeUpdater();
    this.manageCourseService.removeValidator();
  }

  
  isValid = () => {
    return !this.loading && this.messageForm.valid && this.messageForm.dirty;
  };

  loadMessages(messages: any){
    fillForm(this.messageForm, messages);
  }

  getMessages(){
    const courseId =this.manageCourseService.courseId;
    this.loading = true;
    this.courseService.getMessages(courseId).subscribe({
      next:(res:any)=>{
        this.loadMessages(res.messages);
        this.loading=false;
      },
      error:(err)=>{
        console.log(err);
        alert(err?.message);
        this.loading=false;
      },
    })
  }



  updateMessages = () => {
    const courseId = this.manageCourseService.courseId ;
    this.loading = true;

    this.courseService.updateMessages(courseId, this.messageForm.value)
    .subscribe({
      next: (res:any)=>{
        this.loadMessages(res.messages)
        this.loading=false;

      },
      error:(err)=>{
        console.log(err);
        alert(err?.message);
        this.loading = false;
      },
    })
  };
}
