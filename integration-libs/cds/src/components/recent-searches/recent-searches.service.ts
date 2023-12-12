/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 */

import { Injectable } from '@angular/core';

@Injectable()
export class RecentSearchesService {
  getRecentSearches(maxRecentSearches: number): Promise<any> {
    return this.checkAvailability()
      .then((result) => {
        return result.slice(0, maxRecentSearches);
      })
      .catch((error) => {
        console.error('Błąd:', error.message);
      });
  }

  checkAvailability(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let counter = 0;

      function myFunction() {
        counter++;

        if (counter < 15) {
          if ((<any>window).Y_TRACKING?.recentSearches) {
            console.log(counter);
            resolve((<any>window).Y_TRACKING?.recentSearches.getPhrases());
          } else {
            console.log(counter);
            setTimeout(myFunction, 100);
          }
        } else {
          reject(new Error('Exceeded the maximum number of attempts'));
        }
      }

      setTimeout(myFunction, 100);
    });
  }
}
