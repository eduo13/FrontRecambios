import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HandleErrorService } from './HandleErrorService';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private error: HandleErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("interceptando..." + request.url);
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if(currentUser != null && isApiUrl){
      const token: string = currentUser.Token;

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }

    return new Observable((observer) => {
      next.handle(request).subscribe(
        (res: HttpResponse<any>) => {
          if (res instanceof HttpResponse) {
            observer.next(res);
          }
        },
        (err: HttpErrorResponse) => {
          console.log("Error tipo = " + err.status);
          this.error.handleError(err);
        }
      );
    });
  }
}

