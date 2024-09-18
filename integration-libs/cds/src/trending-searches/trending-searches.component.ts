/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import {
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { TrendingSearchesService } from './trending-searches.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { SearchBoxOutletTrendingSearches, SearchPhrases } from './model';

const MAX_TRENDING_SEARCHES = 5;

@Component({
  selector: 'cx-trending-searches',
  templateUrl: './trending-searches.component.html',
})
export class TrendingSearchesComponent implements OnInit, OnDestroy {
  public searchPhrases: SearchPhrases[] = [];
  protected destroy$ = new Subject<void>();

  protected searchBoxComponentService = inject(SearchBoxComponentService);
  protected trendingSearchesService = inject(TrendingSearchesService);
  protected changeDetectorRef = inject(ChangeDetectorRef);
  protected outletContext = inject(OutletContextData, {
    optional: true,
  }) as OutletContextData | null;

  ngOnInit() {
    this.listenToContextChanges();
  }

  protected listenToContextChanges() {
    this.getSearchPhrases()
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchPhrases: SearchPhrases[]) => {
        this.searchPhrases = searchPhrases;
        this.searchBoxComponentService.setTrendingSearches(
          !!this.searchPhrases.length
        );
        this.changeDetectorRef.detectChanges();
      });
  }

  protected getSearchPhrases() {
    return this.contextObservable.pipe(
      takeUntil(this.destroy$),
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
