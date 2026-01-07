/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SearchBoxOutletTrendingSearches, SearchPhrases } from './model';
import { TrendingSearchesService } from './trending-searches.service';

const MAX_TRENDING_SEARCHES = 5;

@Component({
  selector: 'cx-trending-searches',
  templateUrl: './trending-searches.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, RouterLink, AsyncPipe, TranslatePipe, UrlPipe],
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
