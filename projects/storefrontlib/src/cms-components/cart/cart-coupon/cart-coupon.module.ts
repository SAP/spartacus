import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  FeaturesConfigModule,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { AppliedCouponsComponent } from './applied-coupons/applied-coupons.component';
import { CartCouponComponent } from './cart-coupon.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CartCouponComponent, AppliedCouponsComponent],
  exports: [CartCouponComponent, AppliedCouponsComponent],
  imports: [
    FeaturesConfigModule,
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    I18nModule,
    IconModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CartApplyCouponComponent: {
          component: CartCouponComponent,
        },
      },
    }),
  ],
  entryComponents: [CartCouponComponent],
})
export class CartCouponModule {}
