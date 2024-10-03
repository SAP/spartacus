/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RecentSearchesService } from './recent-searches.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WindowRef } from '@spartacus/core';

describe('RecentSearchesService', () => {
  let recentSearchesService: RecentSearchesService;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecentSearchesService, WindowRef],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    recentSearchesService = TestBed.inject(RecentSearchesService);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(recentSearchesService).toBeTruthy();
  });

  it('should emit recent searches when available', fakeAsync(() => {
    const mockRecentSearches = ['query1', 'query2'];

    spyOn(recentSearchesService['recentSearchesSource'], 'next');
    spyOn<any>(recentSearchesService, 'checkAvailability').and.returnValue(
      of(true)
    );

    (<any>windowRef.nativeWindow).Y_TRACKING = {
      recentSearches: {
        addListener: (callback: (recentSearches: string[]) => void) => {
          callback(mockRecentSearches);
        },
        getPhrases: () => mockRecentSearches,
      },
    };
    recentSearchesService['addRecentSearchesListener']();
    tick(150); // Simulate the interval
    tick(0); // Simulate the end of the observable chain

    expect(
      recentSearchesService['recentSearchesSource'].next
    ).toHaveBeenCalledWith(mockRecentSearches);
  }));

  it('should not emit recent searches when not available', fakeAsync(() => {
    spyOn(recentSearchesService['recentSearchesSource'], 'next');
    spyOn<any>(recentSearchesService, 'checkAvailability').and.returnValue(
      of(false)
    );
    recentSearchesService['addRecentSearchesListener']();

    tick(150 * 5); // Simulate 5 intervals (the maximum in checkAvailability)

    expect(
      recentSearchesService['recentSearchesSource'].next
    ).not.toHaveBeenCalled();
  }));
});
