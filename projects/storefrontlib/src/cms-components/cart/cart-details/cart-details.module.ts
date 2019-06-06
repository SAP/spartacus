import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { PromotionsModule } from '../../checkout/components/promotions/promotions.module';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './cart-details.component';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    RouterModule,
    UrlModule,
    PromotionsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CartComponent: {
          component: CartDetailsComponent,
        },
      },
    }),
    I18nModule,
  ],
  declarations: [CartDetailsComponent],
  exports: [CartDetailsComponent],
  entryComponents: [CartDetailsComponent],
})
export class CartDetailsModule {}
