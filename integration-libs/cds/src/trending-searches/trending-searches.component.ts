/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, Optional } from '@angular/core';
import { OutletContextData } from '@spartacus/storefront';
import { TrendingSearchesService } from './trending-searches.service';

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
export class TrendingSearchesComponent implements OnInit {
  public context$ = this.outletContext?.context$;
  public searchPhrases: SearchPhrases[] = [];

  constructor(
    @Optional()
    protected outletContext: OutletContextData<SearchBoxOutletTrendingSearches>,
    private trendingSearchesService: TrendingSearchesService
  ) {}

  ngOnInit() {
    this.context$.subscribe((context: SearchBoxOutletTrendingSearches) => {
      this.trendingSearchesService.getTrendingSearches().subscribe((data) => {
        if (data) {
          this.searchPhrases = data.searchPhrases.slice(
            0,
            context.maxTrendingSearches || MAX_TRENDING_SEARCHES
          );
        }
      });
    });
  }
}
