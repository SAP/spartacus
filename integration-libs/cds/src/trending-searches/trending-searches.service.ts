/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdsEndpointsService } from '../services';
import { CdsConfig } from '../config';
import { BaseSiteService, WindowRef } from '@spartacus/core';
import {
  concatMap,
  interval,
  last,
  map,
  Observable,
  of,
  ReplaySubject,
  take,
  takeWhile,
} from 'rxjs';
import { SearchPhrases } from './model';

const TRENDING_SEARCHES_ENDPOINT_KEY = 'searchIntelligence';

@Injectable({
  providedIn: 'root',
})
export class TrendingSearchesService implements OnDestroy {
  protected httpClient = inject(HttpClient);
  protected cdsEndpointsService = inject(CdsEndpointsService);
  protected cdsConfig = inject(CdsConfig);
  protected baseSiteService = inject(BaseSiteService);
  protected winRef = inject(WindowRef);
  protected interval: any;
  private readonly trendingSearchesSource = new ReplaySubject<
    SearchPhrases[]
  >();
  private trendingSearches$ = this.trendingSearchesSource.asObservable();

  constructor() {
    this.addTrendingSearchesListener();
  }

  private checkAvailability() {
    return interval(250).pipe(
      concatMap((_) => of((this.winRef.nativeWindow as any)?.Y_TRACKING)),
      map((result) => result?.config?.cdsSiteId),
      take(100),
      takeWhile((val) => !val, true),
      last()
    );
  }

  private addTrendingSearchesListener() {
    this.checkAvailability()
      .pipe(take(1))
      .subscribe((cdsSiteId) => {
        if (cdsSiteId) {
          const originalEndpointUrl = this.cdsEndpointsService
            .getUrl(TRENDING_SEARCHES_ENDPOINT_KEY)
            .replaceAll('${cdsSiteId}', cdsSiteId);
          const httpsPrefix = `https://${this.cdsConfig.cds.tenant}-${cdsSiteId}.`;
          const modifiedUrl = originalEndpointUrl.replace(
            /https:\/\//g,
            httpsPrefix
          );

          const fetchTrendingSearches = () => {
            this.httpClient.get<any>(modifiedUrl).subscribe((data) => {
              this.trendingSearchesSource.next(data?.searchPhrases);
            });
          };
          fetchTrendingSearches();
          this.interval = setInterval(
            () => fetchTrendingSearches(),
            15 * 60000
          );
        }
      });
  }

  getTrendingSearches(): Observable<SearchPhrases[]> {
    return this.trendingSearches$;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
