import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL } from '../shared/constants/urls';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(
    private _http:HttpClient
  ) { }

  create(order:Order){
    return this._http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser(): Observable<Order>{
    return this._http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  pay(order:Order): Observable<string>{
    return this._http.post<string>(ORDER_PAY_URL,order);
  }
}
