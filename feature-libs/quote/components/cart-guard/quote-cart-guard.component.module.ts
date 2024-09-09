/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { QuoteCartGuardComponent } from './quote-cart-guard.component';
import { QuoteCartGuard } from './quote-cart.guard';

@NgModule({
    imports: [CommonModule, I18nModule, QuoteCartGuardComponent],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                QuoteCartGuardComponent: {
                    component: QuoteCartGuardComponent,
                    guards: [QuoteCartGuard],
                },
            },
        }),
    ],
    exports: [QuoteCartGuardComponent],
})
export class QuoteCartGuardComponentModule {}
