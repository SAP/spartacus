/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { NotificationPreferenceComponent } from './notification-preference.component';
import { USE_MY_ACCOUNT_V2_NOTIFICATION_PREFERENCE } from '../my-account-v2/use-my-account-v2-consent-notification-perference';
import { MyAccountV2NotificationPreferenceComponent } from '../my-account-v2';

const myAccountV2CmsMapping: CmsConfig = {
  cmsComponents: {
    NotificationPreferenceComponent: {
      component: MyAccountV2NotificationPreferenceComponent,
      //guards: inherited from standard config,
    },
  },
};
@NgModule({
  declarations: [NotificationPreferenceComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    I18nModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'notificationPreference' },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NotificationPreferenceComponent: {
          component: NotificationPreferenceComponent,
          guards: [AuthGuard],
        },
      },
    }),
    provideDefaultConfigFactory(() =>
      inject(USE_MY_ACCOUNT_V2_NOTIFICATION_PREFERENCE)
        ? myAccountV2CmsMapping
        : {}
    ),
  ],
  exports: [NotificationPreferenceComponent],
})
export class NotificationPreferenceModule {}
