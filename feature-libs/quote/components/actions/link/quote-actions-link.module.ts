/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { QuoteActionsLinkComponent } from './quote-actions-link.component';

@NgModule({
  imports: [CommonModule, I18nModule, RouterModule, UrlModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteActionLinksComponent: {
          component: QuoteActionsLinkComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteActionsLinkComponent],
  exports: [QuoteActionsLinkComponent],
})
export class QuoteActionsLinkModule {}
