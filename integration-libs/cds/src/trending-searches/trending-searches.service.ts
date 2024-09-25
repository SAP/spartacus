/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
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
  take,
  takeWhile,
} from 'rxjs';
import { SearchPhrases } from './model';

const TRENDING_SEARCHES_ENDPOINT_KEY = 'searchIntelligence';

@Injectable({
  providedIn: 'root',
})
export class TrendingSearchesService {
  protected httpClient = inject(HttpClient);
  protected cdsEndpointsService = inject(CdsEndpointsService);
  protected cdsConfig = inject(CdsConfig);
  protected baseSiteService = inject(BaseSiteService);
  protected winRef = inject(WindowRef);

  private checkAvailability() {
    return interval(250).pipe(
      concatMap((_) => of((this.winRef.nativeWindow as any)?.Y_TRACKING)),
      map((result) => result?.config?.cdsSiteId),
      take(100),
      takeWhile((val) => !val, true),
      last()
    );
  }

  getTrendingSearches(): Observable<SearchPhrases[]> {
    return new Observable((observer) => {
      this.checkAvailability()
        .pipe(take(1))
        .subscribe((cdsSiteId) => {
          if (cdsSiteId) {
            const originalEndpointUrl = this.cdsEndpointsService.getUrl(
              TRENDING_SEARCHES_ENDPOINT_KEY
            );
            const httpsPrefix = `https://${this.cdsConfig.cds.tenant}-${cdsSiteId}.`;
            const modifiedUrl = originalEndpointUrl.replace(
              /https:\/\//g,
              httpsPrefix
            );

            this.httpClient.get<any>(modifiedUrl).subscribe((data) => {
              observer.next(data?.searchPhrases);
              observer.complete();
            });
          }
        });
    });
  }
}
