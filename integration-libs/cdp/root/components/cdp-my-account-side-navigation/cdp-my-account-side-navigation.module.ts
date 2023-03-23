/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSlotModule } from '@spartacus/storefront';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdpMyAccountSideNavigationComponent } from './cdp-my-account-side-navigation.component';
import { IconModule } from '../../../../../projects/storefrontlib/cms-components/misc/icon/icon.module';

@NgModule({
  declarations: [CdpMyAccountSideNavigationComponent],
  // providers: [
  //   {
  //     provide: AuthService,
  //     useExisting: AuthService,
  //   },
  // ],
  exports: [CdpMyAccountSideNavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UrlModule,
    I18nModule,
    PageSlotModule,
    FeaturesConfigModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CdpMyAccountSideComponent: {
          component: CdpMyAccountSideNavigationComponent,
        },
      },
    }),
    IconModule,
  ],
})
export class CdpMyAccountSideNavigationModule {}
