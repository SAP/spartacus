import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromAction from '../store/actions';
import { GlobalMessageType } from './../models/message.model';

import * as fromUser from '../../user/store';
import { UserErrorHandlingService } from '../../user/services/user-error-handling.service';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    protected store: Store<fromStore.GlobalMessageState>,
    private userErrorHandlingService: UserErrorHandlingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errResponse: any) => {
        if (errResponse instanceof HttpErrorResponse) {
          console.log(errResponse);
          switch (errResponse.status) {
            case 401: // Unauthorized
              return this.userErrorHandlingService.handleExpiredUserToken(
                request,
                next
              );
            case 400: // Bad Request
              if (
                errResponse.url.indexOf(OAUTH_ENDPOINT) !== -1 &&
                errResponse.error.error === 'invalid_grant'
              ) {
                const params = request.body.split('&');
                if (params.indexOf('grant_type=password')) {
                  this.store.dispatch(
                    new fromAction.AddMessage({
                      type: GlobalMessageType.MSG_TYPE_ERROR,
                      text:
                        errResponse.error.error_description +
                        '. Please login again!'
                    })
                  );
                } else if (params.indexOf('grant_type=refresh_token')) {
                  // refresh token fail, force user logout
                  this.store.dispatch(new fromUser.Logout());
                }
              } else {
                this.store.dispatch(
                  new fromAction.AddMessage({
                    type: GlobalMessageType.MSG_TYPE_ERROR,
                    text: errResponse.error.errors[0].message
                  })
                );
              }
              break;
            case 403: // Forbidden
              this.store.dispatch(
                new fromAction.AddMessage({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: 'You are not authorized to perform this action.'
                })
              );
              break;
            case 404: // Not Found
              this.store.dispatch(
                new fromAction.AddMessage({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: 'The requested resource could not be found'
                })
              );
              break;
            case 409: // Already Exists
              this.store.dispatch(
                new fromAction.AddMessage({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: 'Already exists'
                })
              );
              break;
            case 502: // Bad Gateway
              this.store.dispatch(
                new fromAction.AddMessage({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: 'A server error occurred. Please try again later.'
                })
              );
              break;
            case 504: // Gateway Timeout
              this.store.dispatch(
                new fromAction.AddMessage({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: 'The server did not responded, please try again later.'
                })
              );
              break;
            default:
              this.store.dispatch(
                new fromAction.AddMessage({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: errResponse.message
                })
              );
          }
        } else {
          this.store.dispatch(
            new fromAction.AddMessage({
              type: GlobalMessageType.MSG_TYPE_ERROR,
              text: 'An unknown error occured'
            })
          );
        }

        return throwError(errResponse);
      })
    );
  }
}
