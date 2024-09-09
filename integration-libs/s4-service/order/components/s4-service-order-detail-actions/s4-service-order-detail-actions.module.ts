/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { S4ServiceOrderDetailActionsComponent } from './s4-service-order-detail-actions.component';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, I18nModule, RouterModule, UrlModule, S4ServiceOrderDetailActionsComponent],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                AccountOrderDetailsActionsComponent: {
                    component: S4ServiceOrderDetailActionsComponent,
                    //guards: inherited from standard config,
                },
            },
        }),
    ],
    exports: [S4ServiceOrderDetailActionsComponent],
})
export class S4ServiceOrderDetailActionsModule {}
