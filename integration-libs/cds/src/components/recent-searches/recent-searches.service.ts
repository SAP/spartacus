/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { Injectable } from '@angular/core';
import {interval, of, ReplaySubject} from 'rxjs';
import { concatMap, endWith, takeWhile } from 'rxjs/operators';

@Injectable()
export class RecentSearchesService {
  private recentSearchesSource = new ReplaySubject<string[]>();
  recentSearches$ = this.recentSearchesSource.asObservable();

  checkAvailability() {
    return interval(20).pipe(
      concatMap((_) => of((<any>window).Y_TRACKING)),
      takeWhile((result: any) => {
        return !result.recentSearches;
      }),
      endWith(true)
    );
  }

  recentSearchesListener() {
    (<any>window).Y_TRACKING.recentSearches?.addListener((recentSearches) => {
      this.recentSearchesSource.next(recentSearches);
    });
  }
}
