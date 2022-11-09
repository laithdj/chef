import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { CourseService } from 'src/app/common/services/course.service';
import { ICourseGoals, ManageCourseService } from '../manage-course.service';

@Component({
  selector: 'app-course-goals',
  templateUrl: './course-goals.component.html',
  styleUrls: ['./course-goals.component.scss'],
})
export class CourseGoalsComponent implements OnInit, OnDestroy {
  what_you_will_learn: string[] = [];
  requirements: string[] = [];
  who_should_attend: string[] = [];

  loading = false;

  constructor(
    private manageCourseService: ManageCourseService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getGoals();
    Promise.resolve().then(() => {
      this.manageCourseService.save = this.updateGoals;
      this.manageCourseService.isValid = this.isValid;
    });
  }

  ngOnDestroy(): void {
    this.manageCourseService.removeUpdater();
    this.manageCourseService.removeValidator();
  }

  onRequirmentsChange(index: number, e: any) {
    this.requirements[index] = e.target.value;
  }

  onLearningsChange(index: number, e: any) {
    this.what_you_will_learn.splice(index,1, e.target.value);
  }

  onAttendeCHange(index: number, e: any) {
    this.who_should_attend[index] = e.target.value;
  }

  onAddRequirements() {
    this.requirements.push('');
  }

  onAddAttende() {
    this.who_should_attend.push('');
  }

  onAddLearning() {
    this.what_you_will_learn.push('');
  }

  onDeletLearning(index: number) {
    this.what_you_will_learn.splice(index, 1);
  }

  onDeleteAttende(index: number) {
    this.who_should_attend.splice(index, 1);
  }

  onDeleteRequirements(index: number) {
    this.requirements.splice(index, 1);
  }

  isValid = () => {
    if (
      !this.loading &&
      this.what_you_will_learn.filter((x) => x).length &&
      this.who_should_attend.filter((x) => x).length &&
      this.requirements.filter((x) => x).length
    )
      return true;
    else return false;
  };

  loadGoals(goals: any) {
    this.what_you_will_learn = goals.what_you_will_learn;
    this.who_should_attend = goals.who_should_attend;
    this.requirements = goals.requirements;
  }

  getGoals() {
    const courseId = this.manageCourseService.courseId;
    this.loading = true;
    this.courseService.getGoals(courseId).subscribe({
      next: (res: any) => {
        this.loadGoals(res.goals);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        alert(err?.message);
        this.loading = false;
      },
    });
  }

  updateGoals = () => {
    const courseId = this.manageCourseService.courseId;
    this.loading = false;

    this.courseService
      .updateGoals(courseId, {
        what_you_will_learn: this.what_you_will_learn,
        requirements: this.requirements,
        who_should_attend: this.who_should_attend,
      })
      .subscribe({
        next: (res: any) => {
          this.loadGoals(res.goals);
          alert('updated successfuly')
          this.loading = false;
        },
        error: (err) => {
          if(err instanceof HttpErrorResponse && err.status===400){
            alert('Some Fields are missing')
          }
          else{
            alert(err?.message);
          }
          console.log(err);
          this.loading = false;
        },
      });
  };
}
