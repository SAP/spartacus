import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  ItemCounterModule,
  ModalModule,
  ProductImagesModule,
  ProductIntroModule,
  ProductSummaryModule,
  ProductTabsModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CartSharedModule } from 'feature-libs/cart/base/components/cart-shared/cart-shared.module';
import { ProductDetailsDialogComponent } from './product-details-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartSharedModule,
    RouterModule,
    SpinnerModule,
    PromotionsModule,
    UrlModule,
    IconModule,
    I18nModule,
    ItemCounterModule,
    ModalModule,
    ProductSummaryModule,
    ProductIntroModule,
    ProductImagesModule,
    ProductTabsModule,
  ],
  declarations: [ProductDetailsDialogComponent],
  exports: [ProductDetailsDialogComponent],
})
export class ProductDetailsDialogModule {}
