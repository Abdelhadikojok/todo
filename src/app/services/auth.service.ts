import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { LoginRes } from '../models/login-res';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  userSubject = new BehaviorSubject<User | null>(null)
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http : HttpClient) { }

  ngOnInit(): void {

  }

  signIn(email: string, password: string) {

    return this.http.post<LoginRes>(`${environment.apiUrl}/login`, {userId: 2, email: email, password: password , image: ""})
      .pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify(res));
        const user = new User(res.email, res.userid, res.token)
        this.userSubject.next(user);
        this.userSubject.subscribe(res=>console.log("user subject",res))
        this.isLoggedIn.next(true);

      }))
  }

  outoSignIn() {
    let user: LoginRes = JSON.parse(localStorage.getItem('user') || '{}');
    let logedInUser = new User(user.email, user.userid, user.token)
    if (logedInUser.token) {
      this.userSubject.next(logedInUser);
      this.isLoggedIn.next(true)
      console.log("here aouto log in appears", this.userSubject.value)
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.isLoggedIn.next(false)
    localStorage.removeItem('admin')

  }
}
