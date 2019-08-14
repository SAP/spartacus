import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaptchaSelectors, StateWithCaptcha } from '../store';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpCaptchaInterceptor implements HttpInterceptor {
  constructor(private store: Store<StateWithCaptcha>) {}

  // private getToken(): any {
  //   return this.store.pipe(select(CaptchaSelectors.getCaptchaToken));
  // }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.store.pipe(
    //   select(CaptchaSelectors.getCaptchaToken),
    //   map(token => {
    //     console.log(token);
    //   })
    // );
    request = request.clone({
      setParams: {
        token: 'hello',
      },
    });
    // console.log(request);
    return next.handle(request);
  }
}
