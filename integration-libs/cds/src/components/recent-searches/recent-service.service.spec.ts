/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { TestBed } from '@angular/core/testing';
import { RecentSearchesService } from './recent-searches.service';

describe('RecentSearchesService', () => {
  let recentSearchesService: RecentSearchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecentSearchesService],
    });

    recentSearchesService = TestBed.inject(RecentSearchesService);
  });

  it('should be created', () => {
    expect(recentSearchesService).toBeTruthy();
  });
});
