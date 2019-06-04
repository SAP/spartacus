import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  I18nModule,
  UserService,
  ConfigModule,
  CmsConfig,
} from '@spartacus/core';
import { CardModule } from '../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { MyCouponsComponent } from './my-coupons.component';
import { CouponCardComponent } from './coupon-card/coupon-card.component';

import { ListNavigationModule } from 'projects/storefrontlib/src/shared/components/list-navigation/list-navigation.module';
import { CouponDialogComponent } from './coupon-card/coupon-dialog/coupon-dialog.component';
import { IconModule } from '../../../cms-components/misc/icon/index';

@NgModule({
  declarations: [
    MyCouponsComponent,
    CouponCardComponent,
    CouponDialogComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    RouterModule,
    IconModule,
    ListNavigationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MyCouponsComponent: {
          selector: 'cx-my-coupons',
        },
      },
    }),
  ],
  exports: [MyCouponsComponent, CouponCardComponent],
  entryComponents: [CouponDialogComponent],
  providers: [UserService],
})
export class MyCouponsModule {}
