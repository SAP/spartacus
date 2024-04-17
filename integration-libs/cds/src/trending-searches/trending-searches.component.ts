/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { OutletContextData } from '@spartacus/storefront';
import { TrendingSearchesService } from './trending-searches.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

const MAX_TRENDING_SEARCHES = 5;

export interface SearchBoxOutletTrendingSearches {
  maxTrendingSearches?: number;
}

export interface SearchPhrases {
  searchPhrase: string;
  count: number;
}

@Component({
  selector: 'cx-trending-searches',
  templateUrl: './trending-searches.component.html',
})
export class TrendingSearchesComponent implements OnInit, OnDestroy {
  public searchPhrases: SearchPhrases[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    @Optional()
    protected outletContext: OutletContextData<SearchBoxOutletTrendingSearches>,
    private trendingSearchesService: TrendingSearchesService
  ) {}

  ngOnInit() {
    this.listenToContextChanges();
  }

  private listenToContextChanges() {
    this.getSearchPhrases()
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchPhrases: SearchPhrases[]) => {
        this.searchPhrases = searchPhrases;
      });
  }

  private getSearchPhrases() {
    return this.contextObservable.pipe(
      takeUntil(this.destroy$),
      switchMap((context: SearchBoxOutletTrendingSearches) => {
        const maxSearches =
          context?.maxTrendingSearches ?? MAX_TRENDING_SEARCHES;
        return this.trendingSearchesService
          .getTrendingSearches()
          .pipe(
            map((data) =>
              data ? data.slice(0, maxSearches) : []
            )
          );
      })
    );
  }

  get contextObservable() {
    return this.outletContext?.context$ ?? EMPTY;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
