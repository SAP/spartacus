/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';


import { OrderAmendService } from '../../amend-order.service';
import { OrderReturnService } from '../order-return.service';
import { ReturnOrderComponent } from './return-order.component';

@NgModule({
    imports: [
    CommonModule,
    FormErrorsModule,
    ReturnOrderComponent,
],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                ReturnOrderComponent: {
                    component: ReturnOrderComponent,
                    guards: [AuthGuard],
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
    exports: [ReturnOrderComponent],
})
export class ReturnOrderModule {}
