/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CpqAccessData } from './cpq-access-data.models';
/**
 * @deprecated since 2211.25. Not needed for commerce based CPQ orchestration (which is the default communication flavour).
 * Refer to configuration setting ConfiguratorCoreConfig.productConfigurator.cpqOverOcc = true.
 * The other flavour (performing direct calls from composable storefront to CPQ) is technically no longer supported.
 */
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
