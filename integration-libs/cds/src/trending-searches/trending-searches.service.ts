/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdsEndpointsService } from '../services';
import { CdsConfig } from '../config';
import { BaseSiteService, WindowRef } from '@spartacus/core';
import {
  BehaviorSubject,
  Observable,
  timer,
  switchMap,
  map,
  takeWhile,
  take,
  shareReplay,
  EMPTY,
  catchError,
  filter,
} from 'rxjs';
import { SearchPhrases } from './model';

const AVAILABILITY_CHECK_INTERVAL = 250;
const MAX_AVAILABILITY_CHECKS = 100;
const POLL_INTERVAL = 15 * 60000; // 15 minutes
const TRENDING_SEARCHES_ENDPOINT_KEY = 'searchIntelligence';

@Injectable({
  providedIn: 'root',
})
export class TrendingSearchesService implements OnDestroy {
  protected baseSiteService = inject(BaseSiteService);
  protected cdsConfig = inject(CdsConfig);
  protected cdsEndpointsService = inject(CdsEndpointsService);
  protected httpClient = inject(HttpClient);
  protected winRef = inject(WindowRef);

  private destroy$ = new BehaviorSubject<boolean>(false);
  private trendingSearches$ = this.initTrendingSearches().pipe(shareReplay(1));

  protected checkAvailability(): Observable<string> {
    return timer(0, AVAILABILITY_CHECK_INTERVAL).pipe(
      map(
        () => (this.winRef.nativeWindow as any)?.Y_TRACKING?.config?.cdsSiteId
      ),
      takeWhile((cdsSiteId) => !cdsSiteId, true),
      take(MAX_AVAILABILITY_CHECKS),
      filter((cdsSiteId): cdsSiteId is string => !!cdsSiteId)
    );
  }

  protected constructTrendingSearchUrl(cdsSiteId: string): string {
    const originalEndpointUrl = this.cdsEndpointsService
      .getUrl(TRENDING_SEARCHES_ENDPOINT_KEY)
      .replaceAll('${cdsSiteId}', cdsSiteId);

    const expectedPrefix = `https://${this.cdsConfig.cds.tenant}-${cdsSiteId}.`;
    if (!originalEndpointUrl.startsWith(expectedPrefix)) {
      return originalEndpointUrl.replace(/https:\/\//g, expectedPrefix);
    }
    return originalEndpointUrl;
  }

  protected fetchTrendingSearches(url: string): Observable<SearchPhrases[]> {
    return this.httpClient.get<any>(url).pipe(
      map((data) => data?.searchPhrases),
      catchError(() => {
        return EMPTY;
      })
    );
  }

  protected initTrendingSearches(): Observable<SearchPhrases[]> {
    return this.checkAvailability().pipe(
      switchMap((cdsSiteId) => {
        const url = this.constructTrendingSearchUrl(cdsSiteId);
        return timer(0, POLL_INTERVAL).pipe(
          switchMap(() => this.fetchTrendingSearches(url)),
          takeWhile(() => !this.destroy$.value)
        );
      })
    );
  }

  getTrendingSearches(): Observable<SearchPhrases[]> {
    return this.trendingSearches$;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
