/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Optional,
} from '@angular/core';
import {
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { RecentSearchesService } from './recent-searches.service';
import { map, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

export interface SearchBoxOutlet {
  search: string;
  searchBoxActive: boolean;
  maxRecentSearches?: number;
}

const MAX_RECENT_SEARCHES = 5;

@Component({
  selector: 'cx-recent-searches',
  templateUrl: './recent-searches.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentSearchesComponent implements OnInit {
  public result$: Observable<string[]>;
  public outletContext$: Observable<SearchBoxOutlet>;
  protected recentSearchesService = inject(RecentSearchesService);
  protected searchBoxComponentService = inject(SearchBoxComponentService);

  constructor(
    @Optional() protected outletContext: OutletContextData<SearchBoxOutlet>
  ) {}

  ngOnInit() {
    this.result$ = combineLatest([
      this.outletContext?.context$,
      this.recentSearchesService.recentSearches$,
    ]).pipe(
      map(([context, recentSearches]: [SearchBoxOutlet, string[]]) =>
        recentSearches
          .filter(
            (phrase) =>
              phrase.toLowerCase().indexOf(context.search.toLowerCase()) >= 0
          )
          .slice(0, context.maxRecentSearches ?? MAX_RECENT_SEARCHES)
      ),
      tap((results) => {
        this.searchBoxComponentService.setRecentSearches(!!results.length);
      })
    );

    this.outletContext$ = this.outletContext.context$;
  }

  preventDefault(ev: UIEvent): void {
    ev.preventDefault();
  }

  updateChosenWord(chosenWord: string) {
    this.searchBoxComponentService.changeSelectedWord(chosenWord);
  }

  shareEvent(event: KeyboardEvent) {
    if (!event) {
      throw new Error('Missing Event');
    }
    this.searchBoxComponentService.shareEvent(event);
  }
}
