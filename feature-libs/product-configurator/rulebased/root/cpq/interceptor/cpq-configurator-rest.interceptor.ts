import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessStorageService } from './cpq-access-storage.service';

/**
 * This header attribute shall be used to mark any request made to the CPQ System.
 * The presence of it enables this interceptor to actually intercept
 * this request and to decorate it with the authentication related attributes.
 */
export const MARKER_HEADER_CPQ_CONFIGURATOR = 'x-cpq-configurator';

@Injectable({
  providedIn: 'root',
})
export class CpqConfiguratorRestInterceptor implements HttpInterceptor {
  protected readonly HEADER_ATTR_CPQ_SESSION_ID = 'x-cpq-session-id';
  protected readonly HEADER_ATTR_CPQ_NO_COOKIES = 'x-cpq-disable-cookies';

  /**
   * Although CPQ API is stateless and can work without session id, it's recommended to always append the CPQ session id to any request.
   * It enables CPQ load balancer to redirect the request always to the same node, so that configuration related data is already in memory
   * and does not need to be reloaded from DB. This can have a significant impact on performance nd reduce load in the CPQ system.
   */
  protected cpqSessionId: string | null = null;

  constructor(protected cpqAccessStorageService: CpqAccessStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.has(MARKER_HEADER_CPQ_CONFIGURATOR)) {
      return next.handle(request);
    }
    return this.cpqAccessStorageService.getCpqAccessData().pipe(
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
        this.cpqAccessStorageService.renewCpqAccessData();
        return this.cpqAccessStorageService.getCpqAccessData().pipe(
          take(1),
          switchMap((newCpqData) => {
            return next
              .handle(this.enrichHeaders(request, newCpqData))
              .pipe(tap((response) => this.extractCpqSessionId(response)));
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
      url: cpqData.endpoint + request.url,
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + cpqData.accessToken,
        [this.HEADER_ATTR_CPQ_NO_COOKIES]: 'true',
      }),
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
