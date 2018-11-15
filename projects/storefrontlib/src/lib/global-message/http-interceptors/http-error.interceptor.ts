import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalMessageService } from '../facade/global-message.service';
import { GlobalMessageType } from './../models/message.model';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(protected globalMessageService: GlobalMessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errResponse: any) => {
        if (errResponse instanceof HttpErrorResponse) {
          switch (errResponse.status) {
            case 400: // Bad Request
              if (
                errResponse.url.indexOf(OAUTH_ENDPOINT) !== -1 &&
                errResponse.error.error === 'invalid_grant'
              ) {
                if (request.body.get('grant_type') === 'password') {
                  this.globalMessageService.add({
                    type: GlobalMessageType.MSG_TYPE_ERROR,
                    text:
                      this.getErrorMessage(errResponse) +
                      '. Please login again.'
                  });
                  this.globalMessageService.remove(
                    GlobalMessageType.MSG_TYPE_CONFIRMATION
                  );
                }
              } else {
                this.globalMessageService.add({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: this.getErrorMessage(errResponse)
                });
              }
              break;
            case 403: // Forbidden
              this.globalMessageService.add({
                type: GlobalMessageType.MSG_TYPE_ERROR,
                text: 'You are not authorized to perform this action.'
              });
              break;
            case 404: // Not Found
              this.globalMessageService.add({
                type: GlobalMessageType.MSG_TYPE_ERROR,
                text: 'The requested resource could not be found'
              });
              break;
            case 409: // Already Exists
              this.globalMessageService.add({
                type: GlobalMessageType.MSG_TYPE_ERROR,
                text: 'Already exists'
              });
              break;
            case 502: // Bad Gateway
              this.globalMessageService.add({
                type: GlobalMessageType.MSG_TYPE_ERROR,
                text: 'A server error occurred. Please try again later.'
              });
              break;
            case 504: // Gateway Timeout
              this.globalMessageService.add({
                type: GlobalMessageType.MSG_TYPE_ERROR,
                text: 'The server did not responded, please try again later.'
              });
              break;
            default:
              this.globalMessageService.add({
                type: GlobalMessageType.MSG_TYPE_ERROR,
                text: this.getErrorMessage(errResponse)
              });
          }
        } else {
          this.globalMessageService.add({
            type: GlobalMessageType.MSG_TYPE_ERROR,
            text: 'An unknown error occured'
          });
        }

        return throwError(errResponse);
      })
    );
  }

  private getErrorMessage(resp: HttpErrorResponse) {
    let errMsg = resp.message;
    if (resp.error) {
      if (resp.error.errors && resp.error.errors instanceof Array) {
        errMsg = resp.error.errors[0].message;
      } else if (resp.error.error_description) {
        errMsg = resp.error.error_description;
      }
    }

    return errMsg;
  }
}
