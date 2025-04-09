/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SubscriptionListComponent } from './list/subscription-list.component';
import { provideDefaultConfig, CmsConfig, AuthGuard } from '@spartacus/core';

@NgModule({
    imports: [SubscriptionListComponent],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                SubscriptionHistoryComponent: {
                    component: SubscriptionListComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ],
})
export class SubscriptionBillingComponentsModule { }
