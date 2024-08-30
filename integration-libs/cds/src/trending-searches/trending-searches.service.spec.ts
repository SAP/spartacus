/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BaseSiteService, RouterState, RoutingService } from '@spartacus/core';
import { TrendingSearchesService } from './trending-searches.service';
import { Observable, of } from 'rxjs';
import { SearchPhrases } from './model';
import { CdsConfig } from '@spartacus/cds';

let routerStateObservable: any = null;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

const baseSite = 'main';

class MockBaseSiteService {
  getActive(): Observable<string> {
    return of(baseSite);
  }
}

const mockCDSConfig: CdsConfig = {
  cds: {
    tenant: 'storksfront',
    baseUrl: 'https://api.stage.context.cloud.sap',
    endpoints: {
      strategyProducts: '',
      searchIntelligence: '/search-intelligence/v1/sites/main/trendingSearches',
    },
  },
};

describe('TrendingSearchesService', () => {
  let trendingSearchesService: TrendingSearchesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: CdsConfig, useValue: mockCDSConfig },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    trendingSearchesService = TestBed.inject(TrendingSearchesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(trendingSearchesService).toBeTruthy();
  });

  it('should retrieve trending searches', () => {
    const mockSearchPhrases: SearchPhrases[] = [
      { searchPhrase: 'beauty', count: 10 },
      { searchPhrase: 'books', count: 15 },
    ];

    trendingSearchesService.getTrendingSearches().subscribe((searchPhrases) => {
      expect(searchPhrases).toEqual(mockSearchPhrases);
    });

    const mockRequest = httpMock.expectOne((req) =>
      req.url.includes('/search-intelligence/search-intelligence/v1/sites/main/trendingSearches')
    );
    mockRequest.flush({ searchPhrases: mockSearchPhrases });
  });
});
