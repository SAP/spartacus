/* eslint-disable linebreak-style */
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CartItemContextSource,
  CartItemListRowComponent,
  CartSharedModule,
} from '@spartacus/cart/base/components';
import { CartItemContext } from '@spartacus/cart/base/root';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import {
  AtMessageModule,
  ItemCounterModule,
  MediaModule,
  OutletModule,
  PromotionsModule,
} from '@spartacus/storefront';
// import { CartItemValidationWarningModule } from 'feature-libs/cart/base/components/validation/cart-item-warning/cart-item-validation-warning.module';

@Component({
  selector:
    '[cx-subscription-cart-item-list-row], cx-subscription-cart-item-list-row',
  imports: [
    I18nModule,
    CommonModule,
    RouterModule,
    OutletModule,
    UrlModule,
    // CartItemValidationWarningModule,
    MediaModule,
    PromotionsModule,
    AtMessageModule,
    ItemCounterModule,
    FeaturesConfigModule,
    CartSharedModule,
  ],
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
  templateUrl: './subscription-cart-item-list-row.component.html',
})
export class SubscriptionCartItemListRowComponent extends CartItemListRowComponent {
    @Input() subscriptionProducts = false;
}
