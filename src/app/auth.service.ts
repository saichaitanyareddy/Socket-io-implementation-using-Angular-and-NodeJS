import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }
  
  registerUser(user) {
    return this.http.post<any>('/signup', user)
  }

  loginUser(user) {
    return this.http.post<any>('/login', user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}
