import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PromotionsModule } from '../../../../lib/checkout/components/promotions/promotions.module';
import { FormComponentsModule, MediaModule } from '../../../../shared/index';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UrlModule,
    NgbModule,
    PromotionsModule,
    I18nModule,
    MediaModule,
    FormComponentsModule,
  ],
  declarations: [
    CartItemComponent,
    OrderSummaryComponent,
    CartItemListComponent,
  ],
  exports: [CartItemComponent, CartItemListComponent, OrderSummaryComponent],
})
export class CartSharedModule {}
