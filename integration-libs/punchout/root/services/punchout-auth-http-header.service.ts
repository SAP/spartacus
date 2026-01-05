/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  OAuthLibWrapperService,
  OccEndpointsService,
  RoutingService,
} from '@spartacus/core';
import { PunchoutFacade } from '../facade';
import { PunchoutDetectionService } from './punchout-detection.service';

@Injectable({
  providedIn: 'root',
})
export class PunchoutAuthHttpHeaderService extends AuthHttpHeaderService {
  protected punchoutDetectionService = inject(PunchoutDetectionService);
  protected punchoutFacade = inject(PunchoutFacade);
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
   * On backend errors indicating expired `refresh_token`, 2 punchout use cases:
   * - When initializing punchout session, previous token gets silently revoked, punchoutFacade can then create punchout session.
   * - When punchout session already exists, punchout session gets ended.
   * It is a workaround to address CXSPA-9608 - Public pages not displayed when token is invalid.
   * To be removed once CXSPA-9608 is closed.
   */
  public handleExpiredRefreshToken(): void {
    if (this.punchoutDetectionService.isPunchoutSessionPage()) {
      this.punchoutFacade.logoutPunchoutUser().subscribe();
      return;
    }
    if (this.punchoutDetectionService.isPunchoutSession()) {
      this.punchoutFacade.endPunchoutSession().subscribe();
      return;
    }
    super.handleExpiredRefreshToken();
  }
}
