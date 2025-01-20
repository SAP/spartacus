/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';
import { KeyboardFocusModule } from '../../../layout/index';
import { CardModule } from '../../../shared/components/card/card.module';
import { ListNavigationModule } from '../../../shared/components/list-navigation/list-navigation.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { FormErrorsModule } from '../../../shared/components/form/form-errors';
import { IconModule } from '../../misc/icon/icon.module';
import { CouponCardComponent } from './coupon-card/coupon-card.component';
import { CouponDialogComponent } from './coupon-card/coupon-dialog/coupon-dialog.component';
import { CouponClaimComponent } from './coupon-claim/coupon-claim.component';
import { ClaimDialogComponent } from './claim-dialog/claim-dialog.component';
import { defaultCouponLayoutConfig } from './default-coupon-card-layout.config';
import { MyCouponsComponent } from './my-coupons.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorsModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    RouterModule,
    UrlModule,
    IconModule,
    ListNavigationModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'couponClaim' },
      },
    ]),
    KeyboardFocusModule,
    FeaturesConfigModule,
  ],
  declarations: [
    MyCouponsComponent,
    CouponCardComponent,
    CouponDialogComponent,
    CouponClaimComponent,
    ClaimDialogComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyCouponsComponent: {
          component: MyCouponsComponent,
          guards: [AuthGuard],
        },
        CouponClaimComponent: {
          component: CouponClaimComponent,
          guards: [AuthGuard],
        },
        ClaimDialogComponent: {
          component: ClaimDialogComponent,
          guards: [AuthGuard],
        },
      },
    }),
    provideDefaultConfig(defaultCouponLayoutConfig),
  ],
  exports: [MyCouponsComponent, CouponClaimComponent, ClaimDialogComponent],
})
export class MyCouponsModule {}
