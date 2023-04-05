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
import {
  ListNavigationModule,
  SpinnerModule,
  ViewConfig,
} from '@spartacus/storefront';
import { CommerceQuotesListComponentService } from './commerce-quotes-list-component.service';
import { CommerceQuotesListComponent } from './commerce-quotes-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
    ListNavigationModule,
    SpinnerModule,
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
          component: CommerceQuotesListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    CommerceQuotesListComponentService,
  ],
  declarations: [CommerceQuotesListComponent],
  exports: [CommerceQuotesListComponent],
})
export class CommerceQuotesListModule {}
