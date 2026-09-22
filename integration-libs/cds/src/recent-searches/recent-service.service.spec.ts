/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { RecentSearchesService } from './recent-searches.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WindowRef } from '@spartacus/core';

describe('RecentSearchesService', () => {
  let recentSearchesService: RecentSearchesService;
  let windowRef: WindowRef;

  beforeEach(() => {
    const windowRefMock = {
      isBrowser: () => false,
      nativeWindow: {},
    };

    TestBed.configureTestingModule({
      providers: [
        RecentSearchesService,
        { provide: WindowRef, useValue: windowRefMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    recentSearchesService = TestBed.inject(RecentSearchesService);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(recentSearchesService).toBeTruthy();
  });

  it('should emit recent searches when available', () => {
    const mockRecentSearches = ['query1', 'query2'];

    vi.spyOn(recentSearchesService['recentSearchesSource'], 'next');
    vi.spyOn(recentSearchesService as any, 'checkAvailability').mockReturnValue(
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

    expect(
      recentSearchesService['recentSearchesSource'].next
    ).toHaveBeenCalledWith(mockRecentSearches);
  });

  it('should not emit recent searches when not available', () => {
    vi.spyOn(recentSearchesService['recentSearchesSource'], 'next');
    vi.spyOn(recentSearchesService as any, 'checkAvailability').mockReturnValue(
      of(false)
    );
    recentSearchesService['addRecentSearchesListener']();

    expect(
      recentSearchesService['recentSearchesSource'].next
    ).not.toHaveBeenCalled();
  });
});
