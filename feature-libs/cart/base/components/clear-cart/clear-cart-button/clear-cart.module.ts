/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ClearCartComponent } from './clear-cart.component';

import { defaultClearCartLayoutConfig } from '../clear-cart-dialog/default-clear-cart-layout.config';

@NgModule({
    exports: [ClearCartComponent],
    imports: [CommonModule, I18nModule, ClearCartComponent],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                ClearCartComponent: {
                    component: ClearCartComponent,
                },
            },
        }),
        provideDefaultConfig(defaultClearCartLayoutConfig),
    ],
})
export class ClearCartModule {}
