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
import { concatMap, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
  result$: Observable<string[]>;
  outletContext$ = this.outletContext.context$;
  constructor(
    @Optional() protected outletContext?: OutletContextData<SearchBoxOutlet>
  ) {}
  ngOnInit() {
    this.result$ = this.outletContext$.pipe(
      mergeMap((_) => this.recentSearchesService.checkAvailability()),
      concatMap((result) => {
        if (result) {
          return this.recentSearchesService.getRecentSearches(
            MAX_RECENT_SEARCHES
          );
        } else {
          return of(false);
        }
      })
    );
  }

  preventDefault(ev: UIEvent): void {
    ev.preventDefault();
  }

  updateChosenWord(chosenWord: string) {
    this.searchBoxService.changeSelectedWord(chosenWord);
  }
}
