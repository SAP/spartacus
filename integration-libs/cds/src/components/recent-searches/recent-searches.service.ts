/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { interval, Observable, of, ReplaySubject } from 'rxjs';
import { concatMap, endWith, take, takeWhile } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecentSearchesService {
  private readonly recentSearchesSource = new ReplaySubject<string[]>();
  private apiAvailability = false;
  public get recentSearches$(): Observable<string[]> {
    this.addRecentSearchesListener();
    return this.recentSearchesSource.asObservable();
  }
  checkAvailability() {
    return interval(150).pipe(
      concatMap((_) => of((<any>window).Y_TRACKING)),
      take(5),
      takeWhile((result: any) => !result.recentSearches),
      endWith(true)
    );
  }

  private addRecentSearchesListener() {
    if (!this.apiAvailability) {
      this.checkAvailability().subscribe((result) => {
        if (result) {
          const recentPhrases = (<any>(
            window
          )).Y_TRACKING?.recentSearches?.getPhrases();
          if (recentPhrases) {
            this.recentSearchesSource.next(recentPhrases);

            (<any>window).Y_TRACKING.recentSearches?.addListener(
              (recentSearches: string[]) => {
                this.recentSearchesSource.next(recentSearches);
              }
            );

            this.apiAvailability = true;
          }
        }
      });
    }
  }
}
