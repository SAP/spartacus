/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoggerService,
  OccEndpointsService,
  PointOfService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { PickupLocationAdapter } from '@spartacus/pickup-in-store/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccPickupLocationAdapter implements PickupLocationAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService
  ) {
    // Intentional empty constructor
  }

  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.http
      .get<PointOfService>(
        this.occEndpointsService.buildUrl('storeDetails', {
          urlParams: { storeName },
          queryParams: { fields: 'FULL' },
        })
      )
      .pipe(
        catchError((error: any) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }
}
