import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoardingSubject = new BehaviorSubject<boolean>(false)

  constructor() { }

  showLoading() {
    this.isLoardingSubject.next(true);
  }

  hideLoading(){
    this.isLoardingSubject.next(false);
  }

  get isLoading(){
    return this.isLoardingSubject.asObservable();
  }

}
