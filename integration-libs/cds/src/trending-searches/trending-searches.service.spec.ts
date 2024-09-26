/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  BaseSiteService,
  RouterState,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
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
      searchIntelligence:
        '/search-intelligence/v1/sites/${cdsSiteId}/trendingSearches',
    },
  },
};

describe('TrendingSearchesService', () => {
  let trendingSearchesService: TrendingSearchesService;
  let httpMock: HttpTestingController;
  let windowRef: WindowRef;

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
        WindowRef,
      ],
    });

    trendingSearchesService = TestBed.inject(TrendingSearchesService);
    httpMock = TestBed.inject(HttpTestingController);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(trendingSearchesService).toBeTruthy();
  });

  it('should emit trending searches when available', fakeAsync(() => {
    const mockSearchPhrases: SearchPhrases[] = [
      { searchPhrase: 'beauty', count: 10 },
      { searchPhrase: 'books', count: 15 },
    ];

    (<any>windowRef.nativeWindow).Y_TRACKING = {
      config: {
        cdsSiteId: 'main',
      },
    };
    trendingSearchesService['addTrendingSearchesListener']();
    trendingSearchesService['getTrendingSearches']().subscribe(
      (searchPhrases) => {
        expect(searchPhrases).toEqual(mockSearchPhrases);
      }
    );
    tick(150); // simulate the interval
    tick(150); // simulate the interval
    tick(0); // simulate the end of the observable chain

    const mockRequest = httpMock.expectOne((req) =>
      req.url.includes(
        'storksfront-main.api.stage.context.cloud.sap/search-intelligence/v1/sites/main/trendingSearches'
      )
    );
    mockRequest.flush({ searchPhrases: mockSearchPhrases });

    trendingSearchesService.ngOnDestroy();
  }));

  it('should not emit trending searches when not available', fakeAsync(() => {
    (<any>windowRef.nativeWindow).Y_TRACKING = {
      config: {
        cdsSiteId: undefined,
      },
    };
    trendingSearchesService['addTrendingSearchesListener']();
    trendingSearchesService['getTrendingSearches']().subscribe(() => {
      // should not happen
    });

    // simulate maximum intreval in checkAvailability
    for (let i = 0; i <= 250; i++) {
      tick(150);
    }

    httpMock.expectNone((req) =>
      req.url.includes(
        'storksfront-main.api.stage.context.cloud.sap/search-intelligence/v1/sites/main/trendingSearches'
      )
    );

    trendingSearchesService.ngOnDestroy();
  }));
});
