import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private httpClient: HttpClient) { }


  createSubscription(param: any){
    return this.httpClient.post(`${baseUrl}/v1/subscription`,param)
  }


  getSubscriptionByStudentId(){
    return this.httpClient.get(`${baseUrl}/v1/subscription/getSubscriptionByStudentId`);
  }

//   updateGoals(id: string, goals: any){
//     return this.httpClient.patch(`${baseUrl}/v1/courses/goals/${id}`, {goals});
//   }

//   getMessages(id: string){
//     return this.httpClient.get(`${baseUrl}/v1/courses/messages/${id}`)
//   }

//   updateMessages(id: string, messages: any){
//     return this.httpClient.patch(`${baseUrl}/v1/courses/messages/${id}`, {messages})
//   }


//   getBasicInfo(id: string){
//     return this.httpClient.get(`${baseUrl}/v1/courses/basicInfo/${id}`);
//   }

//   updateBasicInfo(id: string, basicInfo: any){
//     return this.httpClient.patch(`${baseUrl}/v1/courses/basicInfo/${id}`, {basicInfo});
//   }

//   getCurriculam(courseId: string){
//     return this.httpClient.get(`${baseUrl}/v1/chapter/getChaptersAndLectures/${courseId}`);
//   }
  
  
//   getInstructorCourses(){
//     return this.httpClient.get(`${baseUrl}/v1/courses`);
//   }

//   getCourse(id: string){
//     return this.httpClient.get(`${baseUrl}/v1/courses/${id}`)
//   }
  
//   searchCourse(query: string){
//     return this.httpClient.get(`${baseUrl}/v1/courses/search/${query}`)
//   }

}