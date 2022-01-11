import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  ItemCounterModule,
  ModalModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';

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
  ],
  providers: [],
  declarations: [AddedToCartDialogComponent],
  exports: [AddedToCartDialogComponent],
})
export class AddedToCartDialogModule {}
