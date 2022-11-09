import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseService } from 'src/app/common/services/course.service';

export interface ICourseGoals {
  what_you_will_learn: string[];
  requirements: string[];
  who_should_attend: string[];
}

export interface IMessage {
  welcome: string;
  congrats: string;
}

export interface ICourseBasicInfo {
  title: string;
  type: string;
  catagory: string;
  description: string;
  subtitle: string;
  subcatagory: string;
  language: string;
  level: string;
  primaryInfo: string;
}

export interface ICourse {
  title: string;
  type: string;
  catagory: string;
  time: string;
  goals: ICourseGoals;
  messages: IMessage;
}
const INITIAL_VALIDATOR_FUNCTION = () => true;
const INITIAL_UPDATE_FUNCTION = () => {};

@Injectable({
  providedIn: 'root',
})

export class ManageCourseService {

  private updateFunction = new BehaviorSubject<Function>(INITIAL_UPDATE_FUNCTION);
  private validatorFunction = new BehaviorSubject<CallableFunction >(INITIAL_VALIDATOR_FUNCTION);

  private _courseId = '';


  get courseId(): string{
    return this._courseId;
  }

  set courseId(id: string){
    this._courseId = id;
  }

  get save(){
    return this.updateFunction.value;
  }

  set save(fun: Function){
    this.updateFunction.next(fun);
  }

  removeUpdater(){
    this.updateFunction.next(INITIAL_UPDATE_FUNCTION);
  }

  removeValidator(){
    this.validatorFunction.next(INITIAL_VALIDATOR_FUNCTION)
  }

  get isValid(){
    return this.validatorFunction.value;
  }

  set isValid(fun: Function ){
    this.validatorFunction.next(fun);
  }


  constructor(private courseService: CourseService) {}

}
