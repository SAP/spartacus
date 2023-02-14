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
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard, PageSlotModule } from '@spartacus/storefront';
import { LoginComponentService } from '@spartacus/user/account/components';
import { CdpMyAccountComponent } from 'integration-libs/cdp/root/components/cdp-my-account/cdp-my-account.component';
import { CdpConfig } from 'integration-libs/cdp/root/config';
import { CdpLoginComponent } from './cdp-login.component';

// const routes: Routes = [
//   { path: 'my-account' , component: CdpMyAccountComponent },
// ];
@NgModule({
  imports: [CommonModule,
           UrlModule,
           PageSlotModule,
           I18nModule,
           RouterModule.forChild([
            {
              // @ts-ignore
              path: 'my-account',
              canActivate: [AuthGuard, CmsPageGuard],
              component: CdpMyAccountComponent,
              data: { pageLabel: 'My Account', cxRoute: 'myAccount' },
            },
           ])],
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
    provideDefaultConfig(CdpConfig),
  ],
  declarations: [CdpLoginComponent],
})
export class CdpLoginModule {}
