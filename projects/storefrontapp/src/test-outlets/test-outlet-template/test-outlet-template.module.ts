/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsPageGuard,
  OutletRefModule,
  PageLayoutModule,
} from '@spartacus/storefront';
import { TestOutletTemplateComponent } from './test-outlet-template.component';

@NgModule({
  imports: [
    CommonModule,
    PageLayoutModule,
    OutletRefModule,
    RouterModule.forChild([
      {
        path: 'test/outlet/template',
        component: TestOutletTemplateComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    TestOutletTemplateComponent,
  ],
})
export class TestOutletTemplateModule {}
