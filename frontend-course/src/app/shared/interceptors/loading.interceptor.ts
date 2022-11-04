import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

var pendingRequests = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private _loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this._loadingService.showLoading();
    pendingRequests = pendingRequests + 1

    return next.handle(request).pipe(
      tap({
        next:(event) => {
          if(event.type === HttpEventType.Response){
            this.handleHideLoading();
          }
        },
        error: (_) => {
          this.handleHideLoading();
        }
      })
    );
  }

  handleHideLoading(){
    pendingRequests = pendingRequests - 1;
    if(pendingRequests === 0)
    this._loadingService.hideLoading();
  }
}
