import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './container/cart-details.component';
import { UrlTranslationModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { PromotionsModule } from '../../checkout/components/promotions/promotions.module';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    RouterModule,
    UrlTranslationModule,
    PromotionsModule
  ],
  declarations: [CartDetailsComponent],
  exports: [CartDetailsComponent]
})
export class CartDetailsModule {}
