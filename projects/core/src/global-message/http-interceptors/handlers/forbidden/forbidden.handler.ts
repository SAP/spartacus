import { Injectable } from '@angular/core';
import { AuthService } from '../../../../auth/user-auth/facade/auth.service';
import { OccEndpointsService } from '../../../../occ/services/occ-endpoints.service';
import { Priority } from '../../../../util/applicable';
import { GlobalMessageService } from '../../../facade/global-message.service';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';

@Injectable({
  providedIn: 'root',
})
export class ForbiddenHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.FORBIDDEN;

  handleError(request) {
    if (
      request.url.endsWith(
        this.occEndpoints.buildUrl('user', {
          urlParams: { userId: 'current' },
        })
      )
    ) {
      this.authService.logout();
    }
    this.globalMessageService.add(
      { key: 'httpHandlers.forbidden' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  getPriority(): Priority {
    return Priority.LOW;
  }

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected authService: AuthService,
    protected occEndpoints: OccEndpointsService
  ) {
    super(globalMessageService);
  }
}
