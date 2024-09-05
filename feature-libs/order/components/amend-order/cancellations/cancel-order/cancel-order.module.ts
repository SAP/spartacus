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
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  FormErrorsModule,
  MessageComponentModule,
} from '@spartacus/storefront';


import { OrderAmendService } from '../../amend-order.service';
import { OrderCancellationService } from '../order-cancellation.service';
import { CancelOrderComponent } from './cancel-order.component';

@NgModule({
    imports: [
    CommonModule,
    I18nModule,
    FormErrorsModule,
    MessageComponentModule,
    FeaturesConfigModule,
    CancelOrderComponent,
],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                CancelOrderComponent: {
                    component: CancelOrderComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderCancellationService,
                        },
                    ],
                },
            },
        }),
    ],
    exports: [CancelOrderComponent],
})
export class CancelOrderModule {}
