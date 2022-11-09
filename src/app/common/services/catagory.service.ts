import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor(private httpClient: HttpClient) { }

  getCatagories(){
    return this.httpClient.get(`${baseUrl}/v1/catagory`);
  }
}
