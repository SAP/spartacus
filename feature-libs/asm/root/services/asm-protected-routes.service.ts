/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  ProtectedRoutesService,
  RoutingConfig,
  UrlParsingService,
} from '@spartacus/core';
import { CsAgentAuthService } from './csagent-auth.service';

/**
 * Extends `ProtectedRoutesService` to allow CS Agent to bypass URL protection.
 *
 * When CS Agent is logged in, all URLs are considered non-protected,
 * allowing access to CMS pages without customer emulation.
 *
 * Overrides `ProtectedRoutesService` when ASM module is enabled.
 */
@Injectable({ providedIn: 'root' })
export class AsmProtectedRoutesService extends ProtectedRoutesService {
  protected csAgentAuthService = inject(CsAgentAuthService);

  constructor(
    protected override config: RoutingConfig,
    protected override urlParsingService: UrlParsingService
  ) {
    super(config, urlParsingService);
  }

  /**
   * When CS Agent is logged in, URLs are not protected.
   * Otherwise, delegates to the parent implementation.
   */
  override isUrlProtected(urlSegments: string[]): boolean {
    let isCsAgentLoggedIn = false;
    this.csAgentAuthService.isCustomerSupportAgentLoggedIn()
      .subscribe(result => isCsAgentLoggedIn = result)
      .unsubscribe();
    if (isCsAgentLoggedIn) {
      return false;
    }
    return super.isUrlProtected(urlSegments);
  }
}
