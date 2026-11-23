/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import {
  Cart,
  CartOutlets,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { CheckoutReviewSubmitComponent } from '@spartacus/checkout/base/components';
import { TranslatePipe } from '@spartacus/core';
import { OutletDirective, PromotionsComponent } from '@spartacus/storefront';
import { OpfCheckoutReviewCardComponent } from '../opf-checkout-review-card';

@Component({
  selector: 'cx-opf-checkout-review-cart-details',
  templateUrl: './opf-checkout-review-cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PromotionsComponent,
    OutletDirective,
    TranslatePipe,
    AsyncPipe,
    OpfCheckoutReviewCardComponent,
  ],
})
export class OpfCheckoutReviewCartDetailsComponent extends CheckoutReviewSubmitComponent {
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() cart: Cart | null;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() entries: any[] | null;
  readonly isAddressCardVisible = input(false);
  readonly promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  cartOutlets = CartOutlets;
}
