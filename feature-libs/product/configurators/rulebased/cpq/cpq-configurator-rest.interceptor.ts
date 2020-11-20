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

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cpqEndpoint = this.cpqAccessStorageService.getActiveEndpoint();
    if (!cpqEndpoint || !request.url.includes(cpqEndpoint)) {
      return next.handle(request);
    }
    return this.cpqAccessStorageService.getCachedCpqAccessData().pipe(
      switchMap((cpqData) => {
        return next
          .handle(this.enrichHeaders(request, cpqData))
          .pipe(tap((response) => this.extractCpqSessionId(response, cpqData)));
      })
    );
  }

  protected extractCpqSessionId(
    response: HttpEvent<any>,
    cpqData: Cpq.AccessData
  ) {
    if (
      response instanceof HttpResponse ||
      response instanceof HttpErrorResponse
    ) {
      const sessionId = response.headers.get(HEADER_ATTR_CPQ_SESSION_ID);
      if (sessionId) {
        cpqData.cpqSessionId = sessionId;
      }
    }
  }

  protected enrichHeaders(
    request: HttpRequest<any>,
    cpqData: Cpq.AccessData
  ): HttpRequest<any> {
    let newRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + cpqData.accessToken,
        [HEADER_ATTR_CPQ_NO_COOKIES]: 'true',
      },
    });
    if (cpqData.cpqSessionId) {
      newRequest = newRequest.clone({
        setHeaders: {
          [HEADER_ATTR_CPQ_SESSION_ID]: cpqData.cpqSessionId,
        },
      });
    }
    return newRequest;
  }
}
