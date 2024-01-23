/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  OutletPosition,
  provideOutlet,
  SearchBoxModule,
} from '@spartacus/storefront';
import { I18nModule, UrlModule } from '@spartacus/core';
import { RecentSearchesComponent } from './recent-searches.component';
import { RecentSearchesService } from './recent-searches.service';

@NgModule({
  exports: [RecentSearchesComponent],
  declarations: [RecentSearchesComponent],
  imports: [CommonModule, I18nModule, SearchBoxModule, UrlModule, RouterModule],
  providers: [
    RecentSearchesService,
    provideOutlet({
      id: 'RECENT_SEARCHES',
      component: RecentSearchesComponent,
      position: OutletPosition.AFTER,
    }),
  ],
})
export class RecentSearchesModule {}
