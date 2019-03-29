import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UrlTranslationModule } from '@spartacus/core';

import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ComponentsModule } from './../../ui/components/components.module';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';
import { PromotionsModule } from '../../checkout/components/promotions/promotions.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    UrlTranslationModule,
    NgbModule,
    PromotionsModule
  ],
  declarations: [
    CartItemComponent,
    OrderSummaryComponent,
    CartItemListComponent
  ],
  exports: [CartItemComponent, CartItemListComponent, OrderSummaryComponent]
})
export class CartSharedModule {}
