import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {Observable,  throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}




// private handleError(error: HttpErrorResponse): void {
//   // Handle the error here
//   console.error('An error occurred:', error);
//   // You can add your custom logic to handle the error, such as showing an error message to the user
// }
