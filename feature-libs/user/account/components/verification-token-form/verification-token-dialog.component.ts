/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { FocusConfig, LaunchDialogService } from '@spartacus/storefront';

export enum VERIFICATION_TOKEN_DIALOG_ACTION {
  OK = 'OK',
}

@Component({
  selector: 'cx-verification-token-dialog',
  templateUrl: './verification-token-dialog.component.html',
})
export class VerificationTokenDialogComponent implements OnInit {
  VERIFICATION_TOKEN_DIALOG_ACTION = VERIFICATION_TOKEN_DIALOG_ACTION;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  constructor(protected launchDialogService: LaunchDialogService) {}

  ngOnInit(): void {}

  closeModal(reason: VERIFICATION_TOKEN_DIALOG_ACTION): void {
    this.launchDialogService.closeDialog(reason);
  }
}
