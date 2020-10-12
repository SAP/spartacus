import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { OccEndpointsService } from 'projects/core/src/occ';
import { Priority } from '../../../../util/applicable';
import { GlobalMessageService } from '../../../facade/global-message.service';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from './../http-error.handler';

/**
 * Handles Oauth client errors when a 401 is returned. This is the case for failing
 * authentication requests to OCC.
 */
@Injectable({
  providedIn: 'root',
})
export class UnauthorizedErrorHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.UNAUTHORIZED;

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected occEndpoints: OccEndpointsService
  ) {
    super(globalMessageService);
  }

  // TODO(#8243): Replace occEndpoints later with auth configuration check
  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    const isNotTokenRevokeRequest = !response.url.includes(
      this.occEndpoints.getRawEndpoint('revoke')
    );
    if (isDevMode() && isNotTokenRevokeRequest) {
      console.warn(
        `There's a problem with the "Oauth client" configuration. You must configure a matching Oauth client in the backend and Spartacus.`
      );
    }

    if (response.error?.error === 'invalid_client') {
      this.globalMessageService.add(
        response.error?.error_description || {
          key: 'httpHandlers.unauthorized.invalid_client',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    } else if (isNotTokenRevokeRequest) {
      this.globalMessageService.add(
        { key: 'httpHandlers.unauthorized.common' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  getPriority() {
    return Priority.LOW;
  }
}
