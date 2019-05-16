import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalMessageType } from '../../models/global-message.model';
import { HttpResponseStatus } from '../../models/response-status.model';
import { HttpErrorHandler } from './http-error.handler';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable({
  providedIn: 'root',
})
export class BadRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    if (
      response.url.includes(OAUTH_ENDPOINT) &&
      response.error.error === 'invalid_grant'
    ) {
      if (request.body.get('grant_type') === 'password') {
        this.globalMessageService.add(
          {
            key: 'httpHandlers.badRequestPleaseLoginAgain',
            params: { errorMessage: this.getErrorMessage(response) },
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
        this.globalMessageService.remove(
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      }
    } else if (response.error.errors[0].type === 'PasswordMismatchError') {
      // uses en translation error message instead of backend exception error
      // @todo: this condition could be removed if backend gives better message
      this.globalMessageService.add(
        { key: 'httpHandlers.badRequestOldPasswordIncorrect' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      // text: customError.customError.passwordMismatch,
    } else {
      // this is currently showing up in case we have a page not found. It should be a 404.
      // see https://jira.hybris.com/browse/CMSX-8516
      const errorMessage = this.getErrorMessage(response);
      const textObj = errorMessage
        ? { raw: errorMessage }
        : { key: 'httpHandlers.unknownError' };
      this.globalMessageService.add(textObj, GlobalMessageType.MSG_TYPE_ERROR);
    }
  }

  protected getErrorMessage(resp: HttpErrorResponse): string {
    let errMsg = resp.message;
    if (resp.error) {
      if (resp.error.errors && resp.error.errors instanceof Array) {
        errMsg = resp.error.errors[0].message;
      } else if (resp.error.error_description) {
        errMsg = resp.error.error_description;
      }
    }

    return errMsg || '';
  }
}
