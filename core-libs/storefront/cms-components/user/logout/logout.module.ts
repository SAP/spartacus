/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import {
  PageLayoutComponent,
  PageLayoutModule,
} from '../../../cms-structure/page/index';
import { defaultLogoutConfig } from './default-logout-config';
import { LogoutGuard } from './logout.guard';
import { CmsPageGuard } from '@spartacus/storefront';

@NgModule({
  imports: [
    PageLayoutModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [LogoutGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'logout' },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(defaultLogoutConfig),
  ],
})
export class LogoutModule {}
