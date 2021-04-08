import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessStorageService } from './cpq-access-storage.service';

export const CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT =
  'cpq-configurator-virtual-enpoint';

@Injectable({
  providedIn: 'root',
})
export class CpqConfiguratorRestInterceptor implements HttpInterceptor {
  protected readonly HEADER_ATTR_CPQ_SESSION_ID = 'x-cpq-session-id';
  protected readonly HEADER_ATTR_CPQ_NO_COOKIES = 'x-cpq-disable-cookies';
  cpqSessionId: string | null;

  constructor(protected cpqAccessStorageService: CpqAccessStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.startsWith(CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT)) {
      return next.handle(request);
    }
    return this.cpqAccessStorageService.getCachedCpqAccessData().pipe(
      take(1), // avoid request being re-executed when token expires
      switchMap((cpqData) => {
        return next.handle(this.enrichHeaders(request, cpqData)).pipe(
          catchError((errorResponse: any) => {
            return this.handleError(errorResponse, next, request);
          }),
          tap((response) => this.extractCpqSessionId(response))
        );
      })
    );
  }

  protected handleError(
    errorResponse: any,
    next: HttpHandler,
    request: HttpRequest<any>
  ): Observable<HttpEvent<any>> {
    if (errorResponse instanceof HttpErrorResponse) {
      if (errorResponse.status === 403) {
        this.cpqAccessStorageService.renewCachedCpqAccessData();
        return this.cpqAccessStorageService.getCachedCpqAccessData().pipe(
          take(1),
          switchMap((newCpqData) => {
            return next.handle(this.enrichHeaders(request, newCpqData));
          })
        );
      }
    }
    return throwError(errorResponse); //propagate error
  }

  protected extractCpqSessionId(response: HttpEvent<any>) {
    if (
      response instanceof HttpResponse ||
      response instanceof HttpErrorResponse
    ) {
      if (response.headers.has(this.HEADER_ATTR_CPQ_SESSION_ID)) {
        this.cpqSessionId = response.headers.get(
          this.HEADER_ATTR_CPQ_SESSION_ID
        );
      }
    }
  }

  protected enrichHeaders(
    request: HttpRequest<any>,
    cpqData: CpqAccessData
  ): HttpRequest<any> {
    let newRequest = request.clone({
      url: request.url.replace(
        CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT,
        cpqData.endpoint
      ),
      setHeaders: {
        Authorization: 'Bearer ' + cpqData.accessToken,
        [this.HEADER_ATTR_CPQ_NO_COOKIES]: 'true',
      },
    });
    if (this.cpqSessionId) {
      newRequest = newRequest.clone({
        setHeaders: {
          [this.HEADER_ATTR_CPQ_SESSION_ID]: this.cpqSessionId,
        },
      });
    }
    return newRequest;
  }
}
