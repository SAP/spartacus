/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, UrlModule, provideDefaultConfig } from '@spartacus/core';
import { NavigationModule } from 'projects/storefrontlib/cms-components/navigation/navigation/navigation.module';
import { GenericLinkModule } from 'projects/storefrontlib/shared/components/generic-link/generic-link.module';
import { CdpMyAccountNameComponent } from './cdp-my-account-name.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    GenericLinkModule,
    I18nModule,
    UrlModule
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CdpMyAccountNameComponent: {
          component: CdpMyAccountNameComponent,
        },
      },
    }),
  ],
  declarations: [CdpMyAccountNameComponent],
  exports: [CdpMyAccountNameComponent],
})
export class CdpMyAccountNameModule {}

