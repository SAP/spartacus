/* eslint-disable linebreak-style */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CartItemListComponent,
  CartSharedModule,
} from '@spartacus/cart/base/components';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { OutletModule } from '@spartacus/storefront';
import { SubscriptionCartItemListRowComponent } from '../item-list-row/subscription-cart-item-list-row.component';

@Component({
  selector: 'cx-subscription-cart-item-list',
  imports: [
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
    ReactiveFormsModule,
    CartSharedModule,
    OutletModule,
    SubscriptionCartItemListRowComponent,
  ],
  standalone: true,
  templateUrl: './subscription-cart-item-list.component.html',
})
export class SubscriptionCartItemListComponent extends CartItemListComponent {
  containsSubscriptions(): boolean {
    let subscriptionProducts = this.items.filter(
      (item) => item.product?.productTypes === 'SUBSCRIPTION'
    );
    return subscriptionProducts.length > 0;
  }
}
