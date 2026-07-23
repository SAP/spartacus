/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthRedirectService } from '@spartacus/core';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';

/**
 * Overrides AuthRedirectService.redirect() to defer the post-login navigation
 * while a B2B unit selection is in progress.
 *
 * The coordinator is set to blocked synchronously inside the LOGIN MetaReducer,
 * guaranteeing that this guard is already active when redirect() is first called.
 */
@Injectable()
export class B2bAwareAuthRedirectService extends AuthRedirectService {
  private coordinator = inject(B2bRedirectCoordinator);

  override redirect(): void {
    if (!this.coordinator.isBlocked()) {
      super.redirect();
      return;
    }
    this.coordinator.whenAllowed$().subscribe(() => {
      super.redirect();
    });
  }
}
