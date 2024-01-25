/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';

@Injectable({
  providedIn: 'root',
})
export class AuthMultisiteIsolationService {
  protected readonly MULTISITE_SEPARATOR = '|';

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
   */
  getBaseSiteDecorator(): Observable<string> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) =>
        Boolean(baseSite?.isolated)
          ? this.MULTISITE_SEPARATOR + baseSite?.uid
          : ''
      )
    );
  }

  /**
   * Method returns concatenated `userId` with the decorator suffix.
   *
   * @param userId The `userId` for given user
   */
  decorateUserId(userId: string): Observable<string> {
    return this.getBaseSiteDecorator().pipe(
      map((decorator) => userId + decorator)
    );
  }
}
