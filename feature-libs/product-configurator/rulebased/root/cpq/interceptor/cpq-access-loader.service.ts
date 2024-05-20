/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CpqAccessData } from './cpq-access-data.models';

@Injectable({ providedIn: 'root' })
export class CpqAccessLoaderService {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected userIdService: UserIdService
  ) {}

  getCpqAccessData(): Observable<CpqAccessData> {
    return this.userIdService.takeUserId(true).pipe(
      switchMap((userId) =>
        this.http.get<CpqAccessData>(
          this.occEndpointsService.buildUrl('getCpqAccessData', {
            urlParams: { userId: userId },
          })
        )
      )
    );
  }
}
