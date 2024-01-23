/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnInit, Optional } from '@angular/core';
import {
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { RecentSearchesService } from './recent-searches.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  protected searchBoxComponentService = inject(SearchBoxComponentService);
  result$ = this.outletContext?.context$.pipe(
    switchMap((context: SearchBoxOutlet) => {
      return this.recentSearchesService.recentSearches$.pipe(
        map((recentSearches) => {
          return recentSearches
            .filter((phrase) => phrase.includes(context.search))
            .slice(0, context.maxRecentSearches || MAX_RECENT_SEARCHES);
        })
      );
    })
  );

  outletContext$: Observable<SearchBoxOutlet>;
  constructor(
    @Optional() protected outletContext: OutletContextData<SearchBoxOutlet>
  ) {}
  ngOnInit() {
    this.outletContext$ = this.outletContext.context$;
  }

  preventDefault(ev: UIEvent): void {
    ev.preventDefault();
  }

  updateChosenWord(chosenWord: string) {
    this.searchBoxComponentService.changeSelectedWord(chosenWord);
  }
}
