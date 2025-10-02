/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { User } from '@spartacus/core';
import { FocusConfig, LaunchDialogService } from '@spartacus/storefront';
import { take } from 'rxjs/operators';
import { AsmComponentService } from '../services';
import { FocusDirective } from '../../../../projects/storefrontlib/layout/a11y/keyboard-focus/focus.directive';
import { IconComponent } from '../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { TranslatePipe } from '../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../projects/core/src/i18n/testing/mock-translate.pipe';

export enum SWITCH_CUSTOMER_DIALOG_ACTION {
  CANCEL = 'CANCEL',
  SWITCH = 'SWITCH',
}

export interface SwitchCustomerData {
  curCustomer: User;
  switchCustomer: User;
}

@Component({
  selector: 'cx-asm-switch-customer-dialog',
  templateUrl: './asm-switch-customer-dialog.component.html',
  imports: [FocusDirective, IconComponent, TranslatePipe, MockTranslatePipe],
})
export class AsmSwitchCustomerDialogComponent implements OnInit {
  SWITCH_CUSTOMER_DIALOG_ACTION = SWITCH_CUSTOMER_DIALOG_ACTION;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };

  curCustomerName: string;
  switchCustomerName: string;
  iconTypes: any;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected asmComponentService: AsmComponentService
  ) {}

  ngOnInit(): void {
    this.launchDialogService.data$
      .pipe(take(1))
      .subscribe((data: SwitchCustomerData) => {
        this.curCustomerName = data.curCustomer.name || '';
        this.switchCustomerName = data.switchCustomer.name || '';
      });
  }

  closeModal(reason: SWITCH_CUSTOMER_DIALOG_ACTION): void {
    if (reason === SWITCH_CUSTOMER_DIALOG_ACTION.SWITCH) {
      this.asmComponentService.logoutCustomer();
    }
    this.launchDialogService.closeDialog(reason);
  }
}
