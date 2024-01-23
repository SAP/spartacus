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

describe('RecentSearchesService', () => {
  let recentSearchesService: RecentSearchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecentSearchesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    recentSearchesService = TestBed.inject(RecentSearchesService);
  });

  it('should be created', () => {
    expect(recentSearchesService).toBeTruthy();
  });

  it('should emit recent searches when available', fakeAsync(() => {
    const mockRecentSearches = ['query1', 'query2'];

    spyOn(recentSearchesService['recentSearchesSource'], 'next');
    spyOn(recentSearchesService, 'checkAvailability').and.returnValue(of(true));

    (<any>window).Y_TRACKING = {
      recentSearches: {
        addListener: (callback: (recentSearches: string[]) => void) => {
          callback(mockRecentSearches);
        },
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
    spyOn(recentSearchesService, 'checkAvailability').and.returnValue(
      of(false)
    );
    recentSearchesService['addRecentSearchesListener']();

    tick(150 * 5); // Simulate 5 intervals (the maximum in checkAvailability)

    expect(
      recentSearchesService['recentSearchesSource'].next
    ).not.toHaveBeenCalled();
  }));

  it('should emit recent searches when API becomes available', fakeAsync(() => {
    const mockRecentSearches = ['query1', 'query2'];

    spyOn(recentSearchesService['recentSearchesSource'], 'next');
    spyOn(recentSearchesService, 'checkAvailability').and.returnValue(
      of(false, false, false, true)
    );

    // Simulate the recent searches callback after some time
    (<any>window).Y_TRACKING = {
      recentSearches: {
        addListener: (callback: (recentSearches: string[]) => void) => {
          callback(mockRecentSearches);
        },
      },
    };
    recentSearchesService['addRecentSearchesListener']();

    tick(150 * 4); // Simulate 4 intervals (API not available)
    tick(150); // Simulate 1 more interval (API becomes available)
    tick(0); // Simulate the end of the observable chain

    // Verify that next was called with the expected arguments
    expect(
      recentSearchesService['recentSearchesSource'].next
    ).toHaveBeenCalledWith(mockRecentSearches);
  }));
});
