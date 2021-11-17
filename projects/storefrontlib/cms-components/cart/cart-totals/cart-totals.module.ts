import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
  FeaturesConfigModule,
} from '@spartacus/core';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartTotalsComponent } from './cart-totals.component';
import { ProgressButtonModule } from '../../../shared/components/progress-button/progress-button.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    CartSharedModule,
    I18nModule,
    CartCouponModule,
    FeaturesConfigModule,
    ProgressButtonModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CartTotalsComponent: {
          component: CartTotalsComponent,
        },
      },
    }),
  ],
  declarations: [CartTotalsComponent],
  exports: [CartTotalsComponent],
})
export class CartTotalsModule {}
