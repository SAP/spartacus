/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtMessageDirective } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-opf-b2b-checkout-place-order',
  templateUrl: './opf-b2b-checkout-place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AtMessageDirective,
    TranslatePipe,
    MockTranslatePipe,
  ],
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
