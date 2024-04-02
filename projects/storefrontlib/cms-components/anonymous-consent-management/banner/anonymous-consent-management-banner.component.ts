/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { AnonymousConsentsService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LAUNCH_CALLER } from '../../../layout/launch-dialog/config/launch-config';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';

@Component({
  selector: 'cx-anonymous-consent-management-banner',
  templateUrl: './anonymous-consent-management-banner.component.html',
})
export class AnonymousConsentManagementBannerComponent implements OnDestroy {
  private subscriptions = new Subscription();

  bannerVisible$: Observable<boolean> =
    this.anonymousConsentsService.isBannerVisible();

  constructor(
    protected anonymousConsentsService: AnonymousConsentsService,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  viewDetails(): void {
    this.hideBanner();
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.ANONYMOUS_CONSENT,
      undefined,
      this.vcr
    );
    if (dialog) {
      this.subscriptions.add(dialog.subscribe());
    }
  }

  allowAll(): void {
    this.subscriptions.add(
      this.anonymousConsentsService
        .giveAllConsents()
        .pipe(tap(() => this.hideBanner()))
        .subscribe()
    );
  }

  hideBanner(): void {
    this.anonymousConsentsService.toggleBannerDismissed(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
