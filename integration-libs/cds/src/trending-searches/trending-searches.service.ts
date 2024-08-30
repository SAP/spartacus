/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdsEndpointsService } from '../services';
import { CdsConfig } from '../config';
import { BaseSiteService } from '@spartacus/core';
import { Observable } from 'rxjs';
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

  getTrendingSearches(): Observable<SearchPhrases[]> {
    return new Observable((observer) => {
      this.baseSiteService.getActive().subscribe((currentSite: string) => {
        const originalEndpointUrl = this.cdsEndpointsService.getUrl(
          TRENDING_SEARCHES_ENDPOINT_KEY, { currentSite }
        );
        const httpsPrefix = `https://${this.cdsConfig.cds.tenant}-${currentSite}.`;
        const modifiedUrl = originalEndpointUrl.replace(
          /https:\/\//g,
          httpsPrefix
        );

        this.httpClient.get<any>(modifiedUrl).subscribe((data) => {
          observer.next(data?.searchPhrases);
          observer.complete();
        });
      });
    });
  }
}
