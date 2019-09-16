import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalMessageType } from '../../models/global-message.model';
import { HttpResponseStatus } from '../../models/response-status.model';
import { HttpErrorHandler } from './http-error.handler';
import { ErrorModel } from '../../../model/misc.model';
import { Translatable } from '../../../i18n/translatable';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable({
  providedIn: 'root',
})
export class BadRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    if (
      response.url.includes(OAUTH_ENDPOINT) &&
      response.error &&
      response.error.error === 'invalid_grant' &&
      request.body.get('grant_type') === 'password'
    ) {
      this.globalMessageService.add(
        {
          key: 'httpHandlers.badRequestPleaseLoginAgain',
          params: {
            errorMessage:
              response.error.error_description || response.message || '',
          },
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_CONFIRMATION);
    } else {
      if (
        response.error &&
        response.error.errors &&
        response.error.errors instanceof Array
      ) {
        response.error.errors.forEach((error: ErrorModel) => {
          let errorMessage: Translatable;
          if (error.type === 'PasswordMismatchError') {
            // uses en translation error message instead of backend exception error
            // @todo: this condition could be removed if backend gives better message
            errorMessage = {
              key: 'httpHandlers.badRequestOldPasswordIncorrect',
            };
          } else if (
            error.subjectType === 'cart' &&
            error.reason === 'notFound'
          ) {
            errorMessage = { key: 'httpHandlers.cartNotFound' };
          } else if (error.type === 'ValidationError') {
            // build translation key in case of backend field validation error
            errorMessage = {
              key: `httpHandlers.validationErrors.${error.reason}.${error.subject}`,
            };
          } else {
            // this is currently showing up in case we have a page not found. It should be a 404.
            // see https://jira.hybris.com/browse/CMSX-8516
            errorMessage = { raw: error.message || '' };
          }
          this.globalMessageService.add(
            errorMessage,
            GlobalMessageType.MSG_TYPE_ERROR
          );
        });
      }
    }
  }
}
