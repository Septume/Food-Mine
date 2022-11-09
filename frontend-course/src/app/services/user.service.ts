import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from './../shared/constants/urls';

import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/User';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
public userObservable:Observable<User>;

constructor(private _http:HttpClient, private _toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  //checkout
  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this._http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this._toastrService.success(
            `Welcome to Food Mine ${user.nom}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this._toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  register(userRegister:IUserRegister): Observable<User>{
    return this._http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this._toastrService.success(
            `Welcome to Food Mine ${user.nom}!`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this._toastrService.error(errorResponse.error, 'Register Failed');
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
