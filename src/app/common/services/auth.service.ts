import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from './../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  role: string;
  email: string
}

export const tokenTypes = {
  ACCESS: 'AUTH',
  REFRESH: 'REAUTH',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  private role = new BehaviorSubject<string>('STUDENT');

  constructor(private httpClient: HttpClient) {}

  setUser(user: User | null) {
    this.user.next(user);
  }

  getUser() {
    return this.user;
  }

  getRole() {
    return this.role.value;
  }

  isLoggedIn() {
    return this.user.value ? true : false;
  }

  saveToken(name: string, token: string) {
    localStorage.setItem(name, token);
  }

  getToken(name: string) {
    return localStorage.getItem(name);
  }
  removeToken(name: string) {
    localStorage.removeItem(name);
  }

  doLogout() {
    this.logout().subscribe({
      next: (res) => {
        this.removeToken(tokenTypes.ACCESS);
        this.removeToken(tokenTypes.REFRESH);
        this.setUser(null);
      },
      error: (err) => {
        console.error(err.error.message);
      },
    });
  }

  registerUser(params: any) {
    return this.httpClient.post(`${baseUrl}/v1/auth/register`, params);
  }

  login(params: any) {
    return this.httpClient.post(`${baseUrl}/v1/auth/login`, params);
  }

  logout() {
    return this.httpClient.post(`${baseUrl}/v1/auth/logout`, {refreshToken:this.getToken(tokenTypes.REFRESH)});
  }
  removeUser(){
    this.removeToken(tokenTypes.ACCESS);
    this.removeToken(tokenTypes.REFRESH);
    this.setUser(null);
  }

  forgetPassword(email: string) {
    return this.httpClient.post(`${baseUrl}/v1/auth/forgot-password`, {
      email,
    });
  }

  resetPassword(token: string, param: any) {
    return this.httpClient.post(
      `${baseUrl}/v1/auth/reset-password?token=${token}`,
      param
    );
  }

  refreshToken() {
    return this.httpClient.post(`${baseUrl}/v1/auth/refresh-tokens`, {
      refreshToken: this.getToken(tokenTypes.REFRESH),
    });
  }
  

  loadUserDetails() {
    return new Promise((resolve, reject) => {
      this.httpClient.get(`${baseUrl}/v1/users/getUserDetails`).subscribe({
        next: (user: any) => {
          this.user.next( user);
          resolve(true);
        },
        error: (err) => {
          resolve(true);
        },
      });
    });
  }

  UserDetails() {
    return this.httpClient.get(`${baseUrl}/v1/users/getUserDetails`)
}


  // price 
  updatePrice(userId: string, channelPrice: number){
    return this.httpClient.patch(`${baseUrl}/v1/users/price/${userId}`,{channelPrice})
  }

  getPrice(userId: any){
    return this.httpClient.get(`${baseUrl}/v1/users/getChannelPrice/${userId}`)
  }



}
