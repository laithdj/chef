import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }
  
  makePayment(stripeToken: any,amount:number): Observable<any>{
    // const baseUrl = `http://localhost:5000`;
    return this.http.post<any>(`${baseUrl}/v1/payment/checkout`,{token:stripeToken,amount})
  }
}