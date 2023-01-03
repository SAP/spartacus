/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { OccEndpointsService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CpqAccessData } from './cpq-access-data.models';

@Injectable({ providedIn: 'root' })
export class CpqAccessLoaderService {
  //TODO(CXSPA-1014): make UserIdService a required dependency
  constructor(
    http: HttpClient,
    occEndpointsService: OccEndpointsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    userIdService: UserIdService
  );

  /**
   * @deprecated since 5.1
   */
  constructor(http: HttpClient, occEndpointsService: OccEndpointsService);

  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    @Optional()
    protected userIdService?: UserIdService
  ) {}

  getCpqAccessData(): Observable<CpqAccessData> {
    return this.userIdService
      ? this.userIdService.takeUserId(true).pipe(
          switchMap((userId) =>
            this.http.get<CpqAccessData>(
              this.occEndpointsService.buildUrl('getCpqAccessData', {
                urlParams: { userId: userId },
              })
            )
          )
        )
      : this.http.get<CpqAccessData>(
          this.occEndpointsService.buildUrl('getCpqAccessData', {
            urlParams: { userId: 'current' },
          })
        );
  }
}
