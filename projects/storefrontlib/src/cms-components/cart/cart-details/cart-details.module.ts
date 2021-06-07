import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { PromotionService } from '../../../shared/services/promotion/promotion.service';
import { PromotionsModule } from '../../misc/promotions/promotions.module';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartPromotionService } from '../cart-promotion.service';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './cart-details.component';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    CartCouponModule,
    RouterModule,
    UrlModule,
    PromotionsModule,
    FeaturesConfigModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CartComponent: {
          component: CartDetailsComponent,
          providers: [
            {
              provide: PromotionService,
              useExisting: CartPromotionService,
            },
          ],
        },
      },
    }),
  ],
  declarations: [CartDetailsComponent],
  exports: [CartDetailsComponent],
})
export class CartDetailsModule {}
