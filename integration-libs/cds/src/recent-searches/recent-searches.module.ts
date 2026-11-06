/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletPosition,
  provideOutlet,
  SearchBoxModule,
  SearchBoxOutlets,
} from '@spartacus/storefront';
import { RecentSearchesHeaderComponent } from './recent-searches-header.component';
import { RecentSearchesComponent } from './recent-searches.component';

@NgModule({
  exports: [RecentSearchesComponent, RecentSearchesHeaderComponent],
  imports: [
    CommonModule,
    FeaturesConfigModule,
    I18nModule,
    SearchBoxModule,
    UrlModule,
    RouterModule,
    RecentSearchesComponent,
    RecentSearchesHeaderComponent,
    IconModule,
  ],
  providers: [
    provideOutlet({
      id: SearchBoxOutlets.RECENT_SEARCHES,
      component: RecentSearchesComponent,
      position: OutletPosition.AFTER,
    }),
    provideOutlet({
      id: SearchBoxOutlets.RECENT_SEARCHES_HEADER,
      component: RecentSearchesHeaderComponent,
      position: OutletPosition.REPLACE,
    }),
  ],
})
export class RecentSearchesModule {}
