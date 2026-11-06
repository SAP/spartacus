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
import { TestBed } from '@angular/core/testing';
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
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit trending searches when available', async () => {
    vi.useFakeTimers();
    const mockSearchPhrases: SearchPhrases[] = [
      { searchPhrase: 'test1', count: 10 },
      { searchPhrase: 'test2', count: 15 },
    ];
    let searchPhrases: SearchPhrases[] = [];

    const subscription = service.getTrendingSearches().subscribe((result) => {
      searchPhrases = result;
    });

    await vi.advanceTimersByTimeAsync(250);

    const req = httpMock.expectOne(
      'https://storksfront-main.api.stage.context.cloud.sap/search-intelligence/v1/sites/main/trendingSearches'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ searchPhrases: mockSearchPhrases });

    expect(searchPhrases).toEqual(mockSearchPhrases);

    subscription.unsubscribe();
    service.ngOnDestroy();
  });

  it('should not emit when cdsSiteId is not available', async () => {
    vi.useFakeTimers();
    (<any>windowRef.nativeWindow).Y_TRACKING = {
      config: {
        cdsSiteId: undefined,
      },
    };

    let emitted = false;
    const subscription = service.getTrendingSearches().subscribe(() => {
      emitted = true;
    });

    await vi.advanceTimersByTimeAsync(250 * 100);

    expect(emitted).toBeFalsy();

    subscription.unsubscribe();
    service.ngOnDestroy();
  });
});
