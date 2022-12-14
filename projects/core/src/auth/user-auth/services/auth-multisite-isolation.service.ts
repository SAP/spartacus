/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BaseSite, BaseSiteService } from '@spartacus/core';

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
      .subscribe((baseSite: BaseSite | undefined) => {
        if (baseSite?.isolated) {
          baseSiteUid =
            AuthMultisiteIsolationService.MULTISITE_SEPARATOR + baseSite?.uid;
        }
      })
      .unsubscribe();

    return baseSiteUid;
  }
}
