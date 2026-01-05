/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { TrendingSearchesService } from './trending-searches.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { SearchBoxOutletTrendingSearches, SearchPhrases } from './model';

const MAX_TRENDING_SEARCHES = 5;

@Component({
  selector: 'cx-trending-searches',
  templateUrl: './trending-searches.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TrendingSearchesComponent implements OnInit {
  public searchPhrases$: Observable<SearchPhrases[]>;

  protected searchBoxComponentService = inject(SearchBoxComponentService);
  protected trendingSearchesService = inject(TrendingSearchesService);
  protected outletContext = inject(OutletContextData, {
    optional: true,
  }) as OutletContextData | null;

  ngOnInit() {
    this.searchPhrases$ = this.getSearchPhrases().pipe(
      tap((searchPhrases) => {
        this.searchBoxComponentService.setTrendingSearches(
          !!searchPhrases.length
        );
      })
    );
  }

  protected getSearchPhrases(): Observable<SearchPhrases[]> {
    return this.contextObservable.pipe(
      switchMap((context: SearchBoxOutletTrendingSearches) => {
        const maxSearches =
          context?.maxTrendingSearches ?? MAX_TRENDING_SEARCHES;
        return this.trendingSearchesService
          .getTrendingSearches()
          .pipe(map((data) => (data ? data.slice(0, maxSearches) : [])));
      })
    );
  }

  get contextObservable() {
    return this.outletContext?.context$ ?? EMPTY;
  }

  shareEvent(event: KeyboardEvent) {
    if (!event) {
      throw new Error('Missing Event');
    }
    this.searchBoxComponentService.shareEvent(event);
  }
}
