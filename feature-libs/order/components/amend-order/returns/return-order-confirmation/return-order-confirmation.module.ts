/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';


import { OrderAmendService } from '../../amend-order.service';
import { OrderReturnGuard } from '../order-return.guard';
import { OrderReturnService } from '../order-return.service';
import { ReturnOrderConfirmationComponent } from './return-order-confirmation.component';

@NgModule({
    imports: [
    CommonModule,
    I18nModule,
    ReactiveFormsModule,
    ReturnOrderConfirmationComponent,
],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                ReturnOrderConfirmationComponent: {
                    component: ReturnOrderConfirmationComponent,
                    guards: [AuthGuard, OrderReturnGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderReturnService,
                        },
                    ],
                },
            },
        }),
    ],
    exports: [ReturnOrderConfirmationComponent],
})
export class ReturnOrderConfirmationModule {}
