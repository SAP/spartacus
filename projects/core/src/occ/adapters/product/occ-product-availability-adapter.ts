/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';
import { ProductAvailabilities } from '../../../model/product.model';
import { ProductAvailabilityAdapter } from '../../../product/connectors/product/prduct-availability.adapter';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccProductAvailabilityAdapter
  implements ProductAvailabilityAdapter
{
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);

  loadRealTimeStock(
    productCode: string,
    unitSapCode: string
  ): Observable<ProductAvailabilities> {
    const availabilityUrl = this.occEndpoints.buildUrl(
      'productAvailabilities',
      {
        urlParams: {
          productCode: productCode,
          unitSapCode: unitSapCode,
        },
      }
    );

    return this.http.get(availabilityUrl).pipe(
      take(1),
      map(
        (availabilities: any) =>
          availabilities?.availabilityItems?.[0]?.unitAvailabilities?.[0] || {}
      ),
      catchError(() => {
        return of({});
      })
    );
  }
}
