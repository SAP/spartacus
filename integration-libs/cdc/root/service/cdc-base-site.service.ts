/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BaseSiteService } from '@spartacus/core';
import { CdcBaseSite } from 'integration-libs/cdc/core/models/cms.model';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class CdcBaseSiteService extends BaseSiteService {
  /**
   * Get base site data based on site uid
   */
  get(siteUid?: string): Observable<CdcBaseSite | undefined> {
    if (siteUid) {
      return this.getAll().pipe(
        map((sites) => sites.find((site) => site.uid === siteUid))
      );
    }

    return this.getActive().pipe(
      switchMap((activeSiteUid) =>
        this.getAll().pipe(
          map((sites) => sites.find((site) => site.uid === activeSiteUid))
        )
      )
    );
  }
}
