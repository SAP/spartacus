/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';

import { VisualPickingProductFilterModule } from './product-filter/visual-picking-product-filter.module';

import { VisualPickingTabComponent } from './visual-picking-tab.component';

@NgModule({
    imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    VisualPickingProductFilterModule,
    VisualPickingTabComponent,
],
    providers: [
        provideDefaultConfig({
            cmsComponents: {
                VisualPickingTabComponent: {
                    component: VisualPickingTabComponent,
                },
            },
        } as CmsConfig),
    ],
    exports: [VisualPickingTabComponent],
})
export class VisualPickingTabModule {}
