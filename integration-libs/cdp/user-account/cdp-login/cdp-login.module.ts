/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { PageSlotModule } from '@spartacus/storefront';
import { LoginComponentService } from '@spartacus/user/account/components';
import { CdpMyAccountComponent } from 'integration-libs/cdp/components/cdp-my-account/cdp-my-account.component';
import { CdpLoginComponent } from './cdp-login.component';

const routes: Routes = [
  { path: '/my-account', component: CdpMyAccountComponent },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), UrlModule, PageSlotModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        LoginComponent: {
          component: CdpLoginComponent,
          providers: [
            {
              provide: LoginComponentService,
              useClass: LoginComponentService,
            }
         ]
        },
      },
    }),
  ],
  declarations: [CdpLoginComponent],
})
export class CdpLoginModule {}
