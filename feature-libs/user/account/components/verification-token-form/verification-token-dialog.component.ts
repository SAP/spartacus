/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import {
  FocusConfig,
  FocusDirective,
  IconComponent,
  LaunchDialogService,
} from '@spartacus/storefront';
import { VERIFICATION_TOKEN_DIALOG_ACTION } from '@spartacus/user/account/root';

@Component({
  selector: 'cx-verification-token-dialog',
  templateUrl: './verification-token-dialog.component.html',
  imports: [FocusDirective, IconComponent, TranslatePipe],
})
export class VerificationTokenDialogComponent {
  protected launchDialogService = inject(LaunchDialogService);

  VERIFICATION_TOKEN_DIALOG_ACTION = VERIFICATION_TOKEN_DIALOG_ACTION;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  closeModal(reason: VERIFICATION_TOKEN_DIALOG_ACTION): void {
    this.launchDialogService.closeDialog(reason);
  }
}
