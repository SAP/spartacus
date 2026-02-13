/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { interval, last, of, ReplaySubject } from 'rxjs';
import { concatMap, map, take, takeWhile } from 'rxjs/operators';
import { WindowRef } from '@spartacus/core';
import { ProfileTagWindowObject } from '../profiletag/model/profile-tag.model';

@Injectable({ providedIn: 'root' })
export class RecentSearchesService {
  private readonly recentSearchesSource = new ReplaySubject<string[]>();
  public recentSearches$ = this.recentSearchesSource.asObservable();
  constructor(protected winRef: WindowRef) {
    if (this.winRef.isBrowser()) {
      this.addRecentSearchesListener();
    }
  }

  private checkAvailability() {
    return interval(250).pipe(
      concatMap((_) => of((this.winRef.nativeWindow as ProfileTagWindowObject)?.Y_TRACKING)),
      map((result) => !!result?.recentSearches),
      take(100),
      takeWhile((val) => !val, true),
      last()
    );
  }

  private addRecentSearchesListener() {
    this.checkAvailability()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          const recentPhrases = (
            this.winRef.nativeWindow as ProfileTagWindowObject
          )?.Y_TRACKING?.recentSearches?.getPhrases();
          if (recentPhrases) {
            this.recentSearchesSource.next(recentPhrases);
            (
              this.winRef.nativeWindow as ProfileTagWindowObject
            )?.Y_TRACKING?.recentSearches?.addListener(
              (recentSearches: string[]) => {
                this.recentSearchesSource.next(recentSearches);
              }
            );
          }
        }
      });
  }

  removePhrase(phrase: string): void {
    const recentSearches = (this.winRef.nativeWindow as ProfileTagWindowObject)?.Y_TRACKING
      ?.recentSearches;
    if (!recentSearches || !phrase) {
      return;
    }

    if (typeof recentSearches.removePhrase === 'function') {
      recentSearches.removePhrase(phrase);
    }
  }

  clearPhrases(): void {
    const recentSearches = (this.winRef.nativeWindow as ProfileTagWindowObject)?.Y_TRACKING
      ?.recentSearches;
    if (!recentSearches) {
      return;
    }

    if (typeof recentSearches.clearPhrases === 'function') {
      recentSearches.clearPhrases();
    }
  }
}
