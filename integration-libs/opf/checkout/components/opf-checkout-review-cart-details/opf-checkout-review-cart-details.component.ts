/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Cart,
  CartOutlets,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CheckoutReviewSubmitComponent } from '@spartacus/checkout/base/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../projects/storefrontapp/src/environments/environment';

@Component({
  selector: 'cx-opf-checkout-review-cart-details',
  templateUrl: './opf-checkout-review-cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfCheckoutReviewCartDetailsComponent extends CheckoutReviewSubmitComponent {
  @Input() cart: Cart | null;

  @Input() entries: any[] | null;
  protected isB2C=!environment.b2b;
  readonly promotionLocation: PromotionLocation = PromotionLocation.Checkout;

  cartOutlets = CartOutlets;
}
