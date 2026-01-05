/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CheckoutPlaceOrderComponent } from '@spartacus/checkout/base/components';

@Component({
  selector: 'cx-opf-b2b-checkout-place-order',
  templateUrl: './opf-b2b-checkout-place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfB2bCheckoutPlaceOrderComponent
  extends CheckoutPlaceOrderComponent
  implements OnInit
{
  @Input()
  isDisabled?: boolean = false;

  ngOnInit(): void {
    this.checkoutSubmitForm
      .get('termsAndConditions')
      ?.setValue(!this.isDisabled);
  }
}
