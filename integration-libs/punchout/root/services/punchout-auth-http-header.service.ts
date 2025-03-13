/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthRedirectService,
  AuthService,
  AuthStorageService,
  GlobalMessageService,
  GlobalMessageType,
  OAuthLibWrapperService,
  OccEndpointsService,
  RoutingService,
} from '@spartacus/core';
import { PunchoutDetectionService } from './punchout-detection.service';

@Injectable({
  providedIn: 'root',
})
export class PunchoutAuthHttpHeaderService extends AuthHttpHeaderService {
  protected punchoutInitService = inject(PunchoutDetectionService);
  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected occEndpointsService: OccEndpointsService,
    protected authRedirectService: AuthRedirectService
  ) {
    super(
      authService,
      authStorageService,
      oAuthLibWrapperService,
      routingService,
      occEndpointsService,
      globalMessageService,
      authRedirectService
    );
  }

  /**
   * @override
   *
   * On backend errors indicating expired `refresh_token` we need to logout
   * silently by revoke invalid/expired token and prevent Login page redirection.
   * Workaround to address CXSPA-9608 - Public pages not displayed when token is invalid
   * To be removed once CXSPA-9608 is closed.
   */
  public handleExpiredRefreshToken(): void {
    if (!this.punchoutInitService.isPunchoutSessionPage()) {
      super.handleExpiredRefreshToken();
    } else {
      this.authService.coreLogout().finally(() => {
        this.globalMessageService.remove(
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });
    }
  }
}
