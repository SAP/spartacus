/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { OrderComponentsModule } from '@spartacus/order/components';
import { PageSlotModule } from '@spartacus/storefront';
// import { CdpMyAccountComponent } from 'integration-libs/cdp/root/components/cdp-my-account';
import { CdpConfig } from 'integration-libs/cdp/root/config';
import { CdpLoginComponent } from './cdp-login.component';

@NgModule({
  imports: [CommonModule,
           UrlModule,
           PageSlotModule,
           I18nModule,
           OrderComponentsModule,
          //  RouterModule.forChild([
          //   {
          //     // @ts-ignore
          //     path: 'my-account',
          //     canActivate: [AuthGuard, CmsPageGuard],
          //     component: CdpMyAccountComponent,
          //     data: { pageLabel: '/my-account', cxRoute: 'myAccount' },
          //   },
          //  ])
          ],
           schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // provideDefaultConfig(<CmsConfig>{
    //   cmsComponents: {
    //     LoginComponent: {
    //       component: CdpLoginComponent,
    //       providers: [
    //         {
    //           provide: LoginComponentService,
    //           useClass: LoginComponentService,
    //         }
    //      ]
    //     },
    //   },
    // }),
    provideDefaultConfig(CdpConfig),
  ],
  declarations: [CdpLoginComponent],
})
export class CdpLoginModule {}
