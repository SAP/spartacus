/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { QuoteSummaryComponent } from './quote-summary.component';




@NgModule({
    imports: [
    CommonModule,
    I18nModule,
    QuoteSummaryComponent,
],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                QuoteSummaryComponent: {
                    component: QuoteSummaryComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ],
    exports: [QuoteSummaryComponent],
})
export class QuoteSummaryModule {}
