/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { Component, inject, OnInit, Optional } from '@angular/core';
import {
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { RecentSearchesService } from './recent-searches.service';
import { map } from 'rxjs/operators';

export interface SearchBoxOutlet {
  search: string;
  searchBoxActive: boolean;
  maxRecentSearches?: number;
}

const MAX_RECENT_SEARCHES = 5;
@Component({
  selector: 'cx-recent-searches',
  templateUrl: './recent-searches.component.html',
})
export class RecentSearchesComponent implements OnInit {
  protected recentSearchesService = inject(RecentSearchesService);
  protected searchBoxService = inject(SearchBoxComponentService);
  result$ = this.recentSearchesService.recentSearches$.pipe(
    map((recentSearches) => {
      return recentSearches.slice(0, MAX_RECENT_SEARCHES);
    })
  );
  outletContext$ = this.outletContext.context$;
  constructor(
    @Optional() protected outletContext?: OutletContextData<SearchBoxOutlet>
  ) {}
  ngOnInit() {
    this.recentSearchesService.checkAvailability().subscribe((result) => {
      if (result) {
        this.recentSearchesService.recentSearchesListener();
      }
    });
  }

  preventDefault(ev: UIEvent): void {
    ev.preventDefault();
  }

  updateChosenWord(chosenWord: string) {
    this.searchBoxService.changeSelectedWord(chosenWord);
  }
}
