import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { ItemCounterModule } from '../../../shared/components/item-counter/item-counter.module';
import { MediaModule } from '../../../shared/components/media/media.module';
import { ModalModule } from '../../../shared/components/modal/modal.module';
import { PromotionsModule } from '../../misc/promotions/promotions.module';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartItemValidationWarningModule } from '../validation/cart-item-warning/cart-item-validation-warning.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CartCouponModule,
    ReactiveFormsModule,
    UrlModule,
    NgbModule,
    PromotionsModule,
    I18nModule,
    IconModule,
    MediaModule,
    ItemCounterModule,
    FeaturesConfigModule,
    ModalModule,
    OutletModule,
    CartItemValidationWarningModule,
  ],
  declarations: [
    CartItemComponent,
    OrderSummaryComponent,
    CartItemListComponent,
  ],
  exports: [CartItemComponent, CartItemListComponent, OrderSummaryComponent],
})
export class CartSharedModule {}
