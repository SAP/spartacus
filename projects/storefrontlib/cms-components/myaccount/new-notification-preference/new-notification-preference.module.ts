/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  I18nModule,
  CmsConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { NewNotificationPreferenceComponent } from './new-notification-preference.component';

@NgModule({
  declarations: [NewNotificationPreferenceComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    I18nModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: '',
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'notificationPreference' },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NewNotificationPreferenceComponent: {
          component: NewNotificationPreferenceComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  exports: [NewNotificationPreferenceComponent],
})
export class NewNotificationPreferenceModule {}
