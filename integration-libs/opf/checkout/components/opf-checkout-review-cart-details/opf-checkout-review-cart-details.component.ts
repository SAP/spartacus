/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  PromotionLocation,
  CartOutlets,
  Cart,
} from '@spartacus/cart/base/root';
import { CheckoutReviewSubmitComponent } from '@spartacus/checkout/base/components';

@Component({
  selector: 'cx-opf-checkout-review-cart-details',
  templateUrl: './opf-checkout-review-cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfCheckoutReviewCartDetailsComponent extends CheckoutReviewSubmitComponent {
  @Input() cart: Cart | null;

  @Input() entries: any[] | null;
  @Input() isAddressCardVisible = false;
  readonly promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  cartOutlets = CartOutlets;
}
