/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';

@Injectable({
  providedIn: 'root',
})
export class AuthMultisiteIsolationService {
  protected static MULTISITE_SEPARATOR = '|';

  constructor(protected baseSiteService: BaseSiteService) {}

  getBaseSiteDecorator(): string {
    let baseSiteUid: string = '';

    this.baseSiteService
      .get()
      .pipe(take(1))
      .subscribe((baseSite) => {
        if (baseSite?.isolated) {
          baseSiteUid =
            AuthMultisiteIsolationService.MULTISITE_SEPARATOR + baseSite?.uid;
        }
      });

    return baseSiteUid;
  }
}
