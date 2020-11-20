import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CpqAccessStorageService } from '../occ/cpq/cpq-access-storage.service';
import { Cpq } from './cpq.models';

const HEADER_ATTR_CPQ_SESSION_ID = 'x-cpq-session-id';
const HEADER_ATTR_CPQ_NO_COOKIES = 'x-cpq-disable-cookies';

@Injectable({
  providedIn: 'root',
})
export class CpqConfiguratorRestInterceptor implements HttpInterceptor {
  constructor(protected cpqAccessStorageService: CpqAccessStorageService) {}

  protected currentCpqSessinId: string;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR HIT');
    return this.cpqAccessStorageService.getCachedCpqAccessData().pipe(
      switchMap((cpqData) => {
        if (!request.url.includes(cpqData.endpoint)) {
          console.log('INTERCEPTED NON CPQ REQUSET');
          return next.handle(request);
        }
        console.log('INTERCEPTED CPQ REQUSET');
        return next
          .handle(this.enrichHeaders(request, cpqData))
          .pipe(tap((response) => this.extractCpqSessionId(response)));
      })
    );
  }

  protected extractCpqSessionId(response: HttpEvent<any>) {
    console.log('EXTRACTING CPQ HAEDERS');
    if (
      response instanceof HttpResponse ||
      response instanceof HttpErrorResponse
    ) {
      const sessionId = response.headers.get(HEADER_ATTR_CPQ_SESSION_ID);
      if (sessionId) {
        this.currentCpqSessinId = sessionId;
      }
    }
  }

  protected enrichHeaders(
    request: HttpRequest<any>,
    cpqData: Cpq.AccessData
  ): HttpRequest<any> {
    console.log('ADDING CPQ HAEDERS');
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + cpqData.accessToken,
        [HEADER_ATTR_CPQ_NO_COOKIES]: 'true',
        [HEADER_ATTR_CPQ_SESSION_ID]: cpqData.cpqSessionId,
      },
    });
  }
}
