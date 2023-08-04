import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable()
export class HttpErrorDispatcher implements HttpInterceptor {
  private blockedRequests: string[] = [
    // 'product'
    // 'review'
  // 'references'
  //   'search'
  ];
dispatched = false;
  constructor(protected http: HttpClient) {}

  blockRequests(...urls: string[]): void {
    this.blockedRequests = urls;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Pass through other requests
    return next.handle(request).pipe(tap(() => {
      if (this.isRequestBlocked(request.url)) {
        const errorMessage =  'This request is blocked';
        const error = new HttpErrorResponse({
          error: errorMessage,
          status: 400,
          statusText: errorMessage,
          url: request.url,
        });
        throw  error;
      }
    }));
  }

  private isRequestBlocked(url: string): boolean {
    return this.blockedRequests.some((blockedUrl) => url.includes(blockedUrl));
  }
}
