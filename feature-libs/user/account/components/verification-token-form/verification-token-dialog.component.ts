/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { FocusConfig, LaunchDialogService, KeyboardFocusModule, IconModule } from '@spartacus/storefront';
import { VERIFICATION_TOKEN_DIALOG_ACTION } from '@spartacus/user/account/root';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';

@Component({
    selector: 'cx-verification-token-dialog',
    templateUrl: './verification-token-dialog.component.html',
    standalone: true,
    imports: [
        KeyboardFocusModule,
        IconModule,
        FeaturesConfigModule,
        I18nModule,
    ],
})
export class VerificationTokenDialogComponent {
  VERIFICATION_TOKEN_DIALOG_ACTION = VERIFICATION_TOKEN_DIALOG_ACTION;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  constructor(protected launchDialogService: LaunchDialogService) {}

  closeModal(reason: VERIFICATION_TOKEN_DIALOG_ACTION): void {
    this.launchDialogService.closeDialog(reason);
  }
}
