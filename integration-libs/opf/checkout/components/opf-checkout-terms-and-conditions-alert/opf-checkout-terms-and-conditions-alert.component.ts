/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-opf-checkout-terms-and-conditions-alert',
  templateUrl: './opf-checkout-terms-and-conditions-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutTermsAndConditionsAlertComponent {
  iconTypes = ICON_TYPE;

  @Input() isVisible: boolean;

  close() {
    this.isVisible = false;
  }
}
