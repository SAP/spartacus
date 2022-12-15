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

  /**
   * When isolation is turned on, a customer who registers for baseSiteA
   * can only log into baseSiteA, not baseSiteB.
   * To login into baseSiteB customer have to use the same e-mail and register an account
   * on baseSiteB.
   *
   * The strategy how to handle isolation is to use an additional decorator
   * passed as a suffix to the uid field.
   *
   * Example uid value for baseSiteA will be email@example.com|baseSiteA
   *
   * This method checks if currently active baseSite is "isolated". If so,
   * it returns specific `uid` suffix.
   *
   * Example: `|electronics-standalone`.
   */
  getBaseSiteDecorator(): string {
    let baseSiteUid = '';

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
