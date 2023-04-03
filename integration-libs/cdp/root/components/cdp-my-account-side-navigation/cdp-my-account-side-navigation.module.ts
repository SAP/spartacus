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
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdpMyAccountSideNavigationComponent } from './cdp-my-account-side-navigation.component';
import { IconModule } from '../../../../../projects/storefrontlib/cms-components/misc/icon/icon.module';
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/cms-structure/routing/default-routing-config';
import { CdpConfig } from '../../config/cdp-config';

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
  providers: [

    provideDefaultConfig(CdpConfig),
    provideDefaultConfig(defaultStorefrontRoutesConfig),
  ],
})
export class CdpMyAccountSideNavigationModule {}
