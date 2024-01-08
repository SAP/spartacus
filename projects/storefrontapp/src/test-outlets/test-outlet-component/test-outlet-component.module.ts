/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { TestOutletComponentComponent } from './test-outlet-component.component';

@NgModule({
  imports: [
    CommonModule,
    PageLayoutModule,
    OutletRefModule,
    RouterModule.forChild([
      {
        path: 'test/outlet/component',
        component: TestOutletComponentComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
  ],
  declarations: [TestOutletComponentComponent],
})
export class TestOutletComponentModule {}
