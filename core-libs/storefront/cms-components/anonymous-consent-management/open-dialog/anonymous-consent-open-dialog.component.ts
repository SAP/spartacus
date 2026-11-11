/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { AnonymousConsentsService, TranslatePipe } from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LAUNCH_CALLER } from '../../../layout/launch-dialog/config/launch-config';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
  imports: [AsyncPipe, TranslatePipe],
})
export class AnonymousConsentOpenDialogComponent {
  protected vcr = inject(ViewContainerRef);
  protected anonymousConsentsService = inject(AnonymousConsentsService);
  protected launchDialogService = inject(LaunchDialogService);

  @ViewChild('open') openElement: ElementRef;
  bannerVisible$: Observable<boolean> =
    this.anonymousConsentsService.isBannerVisible();

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
