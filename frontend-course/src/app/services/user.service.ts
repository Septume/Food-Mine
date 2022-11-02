import { BehaviorSubject, Observable, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { Injectable } from '@angular/core';
import { USER_LOGIN_URL } from './../shared/constants/urls';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private userSubject =
  new BehaviorSubject<User>(new User());
public userObservable:Observable<User>;

constructor(private _http:HttpClient,) {
    this.userObservable = this.userSubject.asObservable();
  }

  // login(userLogin:IUserLogin):Observable<User>{
  //   return this._http.post<User>(USER_LOGIN_URL, userLogin).pipe(
  //     tap({
  //       next: (user) => {
  //         this.userSubject.next(user);
  //         this._toastrService.success(
  //           `Welcome to Food Mine ${user.name}!`,
  //           'Login Successful'
  //         )
  //       },
  //       error: (errorResponse) => {
  //         this._toastrService.error(errorResponse.error, 'Login Failed');
  //       }
  //     })
  //   );
  // }
}
