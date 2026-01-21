/*
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPlaceOrderComponent } from '@spartacus/checkout/base/components';
import { I18nModule } from '@spartacus/core';
import { AtMessageModule } from '@spartacus/storefront';

@Component({
  selector: 'cx-opf-b2b-checkout-place-order',
  standalone: true,
  templateUrl: './opf-b2b-checkout-place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, AtMessageModule, I18nModule],
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
