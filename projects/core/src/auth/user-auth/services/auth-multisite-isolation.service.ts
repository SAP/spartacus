/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BaseSiteService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthMultisiteIsolationService {
  protected static MULTISITE_SEPARATOR = '|';

  constructor(protected baseSiteService: BaseSiteService) {}

  isBaseSiteIsolated(): any {
    let isolated: boolean | undefined;

    this.baseSiteService
      .get()
      .subscribe((baseSite) => (isolated = baseSite?.isolated))
      .unsubscribe();
    console.log(isolated);
    return isolated;
  }

  /**
   * Creates decorator structure based on currently activated baseSite.
   */
  getUidDecorator(): Observable<string> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) =>
        baseSite?.isolated
          ? `${AuthMultisiteIsolationService.MULTISITE_SEPARATOR}${baseSite?.uid}`
          : ''
      )
    );
  }
}
