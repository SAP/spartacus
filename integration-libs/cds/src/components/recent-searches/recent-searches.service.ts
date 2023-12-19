/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { Injectable } from '@angular/core';
import { interval, of } from 'rxjs';
import { concatMap, endWith, takeWhile } from 'rxjs/operators';

@Injectable()
export class RecentSearchesService {
  getRecentSearches(maxRecentSearches: number) {
    if ((<any>window).Y_TRACKING?.recentSearches) {
      return of(
        (<any>window).Y_TRACKING?.recentSearches
          .getPhrases()
          .slice(0, maxRecentSearches)
      );
    } else {
      return of(false);
    }
  }

  checkAvailability() {
    return interval(20).pipe(
      concatMap((_) => of((<any>window).Y_TRACKING)),
      takeWhile((result: any) => {
        return !result.recentSearches?.getPhrases();
      }),
      endWith(true)
    );
  }
}
