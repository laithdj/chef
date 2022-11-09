import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private httpClient: HttpClient) { }


  addChapter(param: any){
    return this.httpClient.post(`${baseUrl}/v1/chapter/`, param);
  }
  
  deleteChapter(id: string){
    return this.httpClient.delete(`${baseUrl}/v1/chapter/${id}`);
  }
}
