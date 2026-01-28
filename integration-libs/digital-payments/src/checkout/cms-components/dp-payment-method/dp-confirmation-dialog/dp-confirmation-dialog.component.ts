/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@spartacus/core';
import {
  FocusConfig,
  FocusDirective,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
} from '@spartacus/storefront';
import { DP_CARD_REGISTRATION_STATUS } from '../../../../utils/dp-constants';

@Component({
  selector: 'cx-dp-confirmation-dialog',
  templateUrl: './dp-confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FocusDirective, IconComponent, TranslatePipe],
})
export class DpConfirmationDialogComponent {
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };
  iconTypes = ICON_TYPE;
  protected launchDialogService = inject(LaunchDialogService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);
  cardSaveCancelled: boolean = false;

  dismissDialog(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  continue() {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    delete queryParams[DP_CARD_REGISTRATION_STATUS];
    this.router.navigate([], {
      queryParams,
      relativeTo: this.activatedRoute,
    });
    this.cardSaveCancelled = true;
    this.launchDialogService.closeDialog('continue clicked');
  }
}
