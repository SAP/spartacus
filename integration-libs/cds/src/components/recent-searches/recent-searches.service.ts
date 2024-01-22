/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { Injectable } from '@angular/core';
import { interval, Observable, of, ReplaySubject } from 'rxjs';
import { concatMap, endWith, take, takeWhile } from 'rxjs/operators';

@Injectable()
export class RecentSearchesService {
  private recentSearchesSource = new ReplaySubject<string[]>();
  private apiAvailability = false;
  public get recentSearches$(): Observable<string[]> {
    this.addRecentSearchesListener();
    return this.recentSearchesSource.asObservable();
  }
  private checkAvailability() {
    return interval(150).pipe(
      concatMap((_) => of((<any>window).Y_TRACKING)),
      take(5),
      takeWhile((result: any) => {
        return !result.recentSearches;
      }),
      endWith(true)
    );
  }

  private addRecentSearchesListener() {
    if (!this.apiAvailability) {
      this.checkAvailability().subscribe((result) => {
        if (result) {
          (<any>window).Y_TRACKING.recentSearches?.addListener(
            (recentSearches: string[]) => {
              this.recentSearchesSource.next(recentSearches);
            }
          );
          this.apiAvailability = true;
        }
      });
    }
  }
}
