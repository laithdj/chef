import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }


  createCourse(param: any){
    return this.httpClient.post(`${baseUrl}/v1/courses`,param)
  }


  getGoals(id: string){
    return this.httpClient.get(`${baseUrl}/v1/courses/goals/${id}`);
  }

  updateGoals(id: string, goals: any){
    return this.httpClient.patch(`${baseUrl}/v1/courses/goals/${id}`, {goals});
  }

  getMessages(id: string){
    return this.httpClient.get(`${baseUrl}/v1/courses/messages/${id}`)
  }

  updateMessages(id: string, messages: any){
    return this.httpClient.patch(`${baseUrl}/v1/courses/messages/${id}`, {messages})
  }


  getBasicInfo(id: string){
    return this.httpClient.get(`${baseUrl}/v1/courses/basicInfo/${id}`);
  }

  updateBasicInfo(id: string, basicInfo: any){
    return this.httpClient.patch(`${baseUrl}/v1/courses/basicInfo/${id}`, {basicInfo});
  }

  getCurriculam(courseId: string){
    return this.httpClient.get(`${baseUrl}/v1/chapter/getChaptersAndLectures/${courseId}`);
  }
  
  
  getInstructorCourses(){
    return this.httpClient.get(`${baseUrl}/v1/courses`);
  }

  getCourse(id: string){
    return this.httpClient.get(`${baseUrl}/v1/courses/${id}`)
  }


  Course(id: string){
    return this.httpClient.get(`${baseUrl}/v1/courses/gcourse/${id}`)
  }
  
  searchCourse(query: string){
    return this.httpClient.get(`${baseUrl}/v1/courses/search/${query}`)
  }

  // price 
  updatePrice(id: string, price: number){
    return this.httpClient.patch(`${baseUrl}/v1/courses/price/${id}`,{price})
  }
}