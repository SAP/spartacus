/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  OutletPosition,
  provideOutlet,
  SearchBoxModule,
  SearchBoxOutlets,
} from '@spartacus/storefront';
import { RecentSearchesComponent } from './recent-searches.component';

@NgModule({
  exports: [RecentSearchesComponent],
  imports: [
    CommonModule,
    I18nModule,
    SearchBoxModule,
    UrlModule,
    RouterModule,
    RecentSearchesComponent,
  ],
  providers: [
    provideOutlet({
      id: SearchBoxOutlets.RECENT_SEARCHES,
      component: RecentSearchesComponent,
      position: OutletPosition.AFTER,
    }),
  ],
})
export class RecentSearchesModule {}
