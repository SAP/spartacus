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
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartDetailsComponent } from './cart-details.component';
import { PromotionHelperModule } from '../../../shared/services/promotion/promotion.module';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    CartCouponModule,
    RouterModule,
    UrlModule,
    PromotionsModule,
    PromotionHelperModule,
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
