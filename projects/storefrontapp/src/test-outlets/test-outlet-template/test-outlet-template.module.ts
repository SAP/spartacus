/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  PageLayoutModule,
  OutletRefModule,
  CmsPageGuard,
} from '@spartacus/storefront';
import { CommonModule } from '@angular/common';
import { TestOutletTemplateComponent } from './test-outlet-template.component';
import { RouterModule } from '@angular/router';

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
  ],
  declarations: [TestOutletTemplateComponent],
})
export class TestOutletTemplateModule {}
