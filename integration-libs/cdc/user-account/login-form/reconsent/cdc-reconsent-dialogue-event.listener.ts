/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { CdcReConsentEvent } from '@spartacus/cdc/root';
import { EventService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CdcReconsentDialogEventListener implements OnDestroy {
  protected eventService = inject(EventService);
  protected launchDialogService = inject(LaunchDialogService);

  protected subscription = new Subscription();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.onReconsent();
  }
  protected onReconsent() {
    this.subscription.add(
      this.eventService.get(CdcReConsentEvent).subscribe((event) => {
        this.openDialog(event);
      })
    );
  }

  protected openDialog(event: CdcReConsentEvent) {
    const reconsentData = {
      user: event.user,
      password: event.password,
      consentIds: event.consentIds,
      errorMessage: event.errorMessage,
      regToken: event.regToken,
      preferences: event.preferences,
    };
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CDC_RECONSENT,
      undefined,
      undefined,
      reconsentData
    );
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
