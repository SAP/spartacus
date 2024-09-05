/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelServiceOrderHeadlineComponent } from './cancel-service-order-headline.component';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  CmsConfig,
  AuthGuard,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  IconModule,
  OutletModule,
  PromotionsModule,
} from '@spartacus/storefront';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        I18nModule,
        CardModule,
        UrlModule,
        PromotionsModule,
        IconModule,
        OutletModule,
        CancelServiceOrderHeadlineComponent,
    ],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                CancelServiceOrderHeadline: {
                    component: CancelServiceOrderHeadlineComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ],
    exports: [CancelServiceOrderHeadlineComponent],
})
export class CancelServiceOrderHeadlineModule {}
