/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { RouterModule } from '@angular/router';
import {
  KeyboardFocusModule,
  MediaModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { ProductMultiDimensionalSelectorComponent } from './product-multi-dimensional-selector.component';
import { ProductMultiDimensionalSelectorGuard } from '../guards';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UrlModule,
        MediaModule,
        KeyboardFocusModule,
        NgSelectModule,
        FormsModule,
        NgSelectA11yModule,
        I18nModule,
        ProductMultiDimensionalSelectorComponent,
    ],
    exports: [ProductMultiDimensionalSelectorComponent],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                ProductMultiDimensionalSelectorComponent: {
                    component: ProductMultiDimensionalSelectorComponent,
                    guards: [ProductMultiDimensionalSelectorGuard],
                },
            },
        }),
    ],
})
export class ProductMultiDimensionalSelectorComponentModule {}
