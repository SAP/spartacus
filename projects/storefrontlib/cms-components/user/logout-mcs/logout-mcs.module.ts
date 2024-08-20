/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import {
  PageLayoutComponent,
  PageLayoutModule,
} from '../../../cms-structure/page/index';
import { LogoutMcsGuard } from './logout-mcs.guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    PageLayoutModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [LogoutMcsGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'mcslogout' },
      },
    ]),
  ],
})
export class LogoutMcsModule {}
