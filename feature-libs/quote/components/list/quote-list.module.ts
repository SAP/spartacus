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
import {
  IconModule,
  ListNavigationModule,
  ViewConfig,
} from '@spartacus/storefront';
import { QuoteListComponentService } from './quote-list-component.service';
import { QuoteListComponent } from './quote-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    UrlModule,
    RouterModule,
    ListNavigationModule,
  ],
  providers: [
    provideDefaultConfig(<ViewConfig>{
      view: {
        defaultPageSize: 5,
      },
    }),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountMyQuotesComponent: {
          component: QuoteListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    QuoteListComponentService,
  ],
  declarations: [QuoteListComponent],
  exports: [QuoteListComponent],
})
export class QuoteListModule {}
