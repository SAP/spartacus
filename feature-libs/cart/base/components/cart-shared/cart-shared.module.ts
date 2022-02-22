import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartOutlets } from '@spartacus/cart/base/root';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import {
  AtMessageModule,
  IconModule,
  ItemCounterModule,
  MediaModule,
  ModalModule,
  OutletModule,
  PromotionsModule,
  provideOutlet,
} from '@spartacus/storefront';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartItemValidationWarningModule } from '../validation/cart-item-warning/cart-item-validation-warning.module';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [
    AtMessageModule,
    CartCouponModule,
    CartItemValidationWarningModule,
    CommonModule,
    FeaturesConfigModule,
    I18nModule,
    IconModule,
    ItemCounterModule,
    MediaModule,
    ModalModule,
    NgbModule,
    OutletModule,
    PromotionsModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
  ],
  providers: [
    provideOutlet({
      id: CartOutlets.ORDER_SUMMARY,
      component: OrderSummaryComponent,
    }),
    provideOutlet({
      id: CartOutlets.CART_ITEM_LIST,
      component: CartItemListComponent,
    }),
  ],
  declarations: [
    CartItemComponent,
    OrderSummaryComponent,
    CartItemListComponent,
  ],
  exports: [CartItemComponent, CartItemListComponent, OrderSummaryComponent],
})
export class CartSharedModule {}
