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
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';

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
  protected asmAuthStorageService = inject(AsmAuthStorageService);

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
    if (this.isCSAgentLoggedIn()) {
      return false;
    }
    return super.isUrlProtected(urlSegments);
  }

  /**
   * Synchronously checks if CS Agent is currently logged in.
   */
  protected isCSAgentLoggedIn(): boolean {
    let token: { access_token?: string } | undefined;
    let tokenTarget: TokenTarget | undefined;

    this.asmAuthStorageService
      .getToken()
      .subscribe((t) => (token = t))
      .unsubscribe();

    this.asmAuthStorageService
      .getTokenTarget()
      .subscribe((t) => (tokenTarget = t))
      .unsubscribe();

    return Boolean(token?.access_token) && tokenTarget === TokenTarget.CSAgent;
  }
}
