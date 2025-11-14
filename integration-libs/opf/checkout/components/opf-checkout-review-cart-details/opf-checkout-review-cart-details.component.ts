/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  PromotionLocation,
  CartOutlets,
  Cart,
} from '@spartacus/cart/base/root';
import { PromotionsComponent } from '@spartacus/storefront';
import { OutletDirective } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { CheckoutReviewSubmitComponent } from '@spartacus/checkout/base/components';
import { AsyncPipe, NgIf } from '@angular/common';
import { PickUpItemsDetailsComponent } from '@spartacus/pickup-in-store/components';
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
    PickUpItemsDetailsComponent,
    OpfCheckoutReviewCardComponent,
    NgIf,
  ],
})
export class OpfCheckoutReviewCartDetailsComponent extends CheckoutReviewSubmitComponent {
  @Input() cart: Cart | null;

  @Input() entries: any[] | null;
  @Input() isAddressCardVisible = false;
  readonly promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  cartOutlets = CartOutlets;
}
