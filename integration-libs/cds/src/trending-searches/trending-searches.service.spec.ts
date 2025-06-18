/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CdsConfig } from '@spartacus/cds';
import { BaseSiteService, WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SearchPhrases } from './model';
import { TrendingSearchesService } from './trending-searches.service';

const mockCDSConfig: CdsConfig = {
  cds: {
    tenant: 'storksfront',
    baseUrl: 'https://storksfront-main.api.stage.context.cloud.sap',
    endpoints: {
      strategyProducts: '',
      searchIntelligence:
        '/search-intelligence/v1/sites/${cdsSiteId}/trendingSearches',
    },
  },
};

class MockBaseSiteService {
  getActive(): Observable<string> {
    return of('main');
  }
}

describe('TrendingSearchesService', () => {
  let service: TrendingSearchesService;
  let httpMock: HttpTestingController;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TrendingSearchesService,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: CdsConfig, useValue: mockCDSConfig },
        WindowRef,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TrendingSearchesService);
    httpMock = TestBed.inject(HttpTestingController);
    windowRef = TestBed.inject(WindowRef);

    // Set up window mock
    (<any>windowRef.nativeWindow).Y_TRACKING = {
      config: {
        cdsSiteId: 'main',
      },
    };
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit trending searches when available', fakeAsync(() => {
    const mockSearchPhrases: SearchPhrases[] = [
      { searchPhrase: 'test1', count: 10 },
      { searchPhrase: 'test2', count: 15 },
    ];
    let searchPhrases: SearchPhrases[] = [];

    const subscription = service.getTrendingSearches().subscribe((result) => {
      searchPhrases = result;
    });

    // Fast-forward through the availability check
    tick(250);

    // Handle the HTTP request
    const req = httpMock.expectOne(
      'https://storksfront-main.api.stage.context.cloud.sap/search-intelligence/v1/sites/main/trendingSearches'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ searchPhrases: mockSearchPhrases });

    // Verify the result
    expect(searchPhrases).toEqual(mockSearchPhrases);

    // Clean up
    subscription.unsubscribe();
    service.ngOnDestroy();
  }));

  it('should not emit when cdsSiteId is not available', fakeAsync(() => {
    // Reset window mock
    (<any>windowRef.nativeWindow).Y_TRACKING = {
      config: {
        cdsSiteId: undefined,
      },
    };

    let emitted = false;
    const subscription = service.getTrendingSearches().subscribe(() => {
      emitted = true;
    });

    for (let i = 0; i < 100; i++) {
      tick(250);
    }

    expect(emitted).toBeFalsy();

    // Clean up
    subscription.unsubscribe();
    service.ngOnDestroy();
  }));
});
