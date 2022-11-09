import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private httpClient: HttpClient) { }


  createCoupon(param: any){
    return this.httpClient.post(`${baseUrl}/v1/coupon`,param)
  }

  getCoupon(channel_id: any){
  
    return this.httpClient.get(`${baseUrl}/v1/coupon/getCoupenDetails//${channel_id}`);
    // console.log(channel_id)
  }


  updateCoupon(data:string, param:any){
   return this.httpClient.patch(`${baseUrl}/v1/coupon/${data}`, {param});
  }



}