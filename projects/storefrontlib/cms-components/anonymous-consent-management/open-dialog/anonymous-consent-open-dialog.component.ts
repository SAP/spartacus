/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AnonymousConsentsService, useFeatureStyles } from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LAUNCH_CALLER } from '../../../layout/launch-dialog/config/launch-config';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
})
export class AnonymousConsentOpenDialogComponent {
  @ViewChild('open') openElement: ElementRef;
  bannerVisible$: Observable<boolean> =
    this.anonymousConsentsService.isBannerVisible();

  constructor(
    protected vcr: ViewContainerRef,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected launchDialogService: LaunchDialogService
  ) {
    useFeatureStyles('a11yHideConsentButtonWhenBannerVisible');
  }

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.ANONYMOUS_CONSENT,
      this.openElement,
      this.vcr
    );
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
