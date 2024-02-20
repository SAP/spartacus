/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { QuoteLinksComponent } from './quote-links.component';

@NgModule({
  imports: [CommonModule, I18nModule, RouterModule, UrlModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteLinksComponent: {
          component: QuoteLinksComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuoteLinksComponent],
  exports: [QuoteLinksComponent],
})
export class QuoteLinksModule {}
