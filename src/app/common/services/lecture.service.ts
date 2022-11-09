import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private httpClient: HttpClient) { }


  addLecture(param: any){
    return this.httpClient.post(`${baseUrl}/v1/lecture/`, param)
  }

  deleteLecture(id: string){
    return this.httpClient.delete(`${baseUrl}/v1/lecture/${id}`)
  }
}
