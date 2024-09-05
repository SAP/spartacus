/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { PageLayoutModule, CmsPageGuard } from '@spartacus/storefront';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestOutletComponentComponent } from './test-outlet-component.component';

@NgModule({
    imports: [
    CommonModule,
    PageLayoutModule,
    RouterModule.forChild([
        {
            path: 'test/outlet/component',
            component: TestOutletComponentComponent,
            canActivate: [CmsPageGuard],
        },
    ]),
    TestOutletComponentComponent,
],
})
export class TestOutletComponentModule {}
