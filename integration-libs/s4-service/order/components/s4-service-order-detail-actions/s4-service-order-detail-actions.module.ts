/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { BtnLikeLinkModule } from '@spartacus/storefront';
import { S4ServiceOrderDetailActionsComponent } from './s4-service-order-detail-actions.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    UrlModule,
    BtnLikeLinkModule,
    S4ServiceOrderDetailActionsComponent,
  ],
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
