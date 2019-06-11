import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  CustomerCouponGuard,
} from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';

import { CustomerCouponClaimComponent } from './customer-coupon-claim.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'couponClaim' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CustomerCouponClaimComponent: {
          component: CustomerCouponClaimComponent,
          guards: [AuthGuard, CustomerCouponGuard],
        },
      },
    }),
    I18nModule,
  ],
  declarations: [CustomerCouponClaimComponent],
  exports: [CustomerCouponClaimComponent],
  entryComponents: [CustomerCouponClaimComponent],
})
export class CustomerCouponClaim {}
