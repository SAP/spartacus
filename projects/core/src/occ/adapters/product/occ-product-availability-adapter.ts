/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, take } from 'rxjs';
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
    productUnitPairs: { productCode: string; unitCode: string }[]
  ): Observable<ProductAvailabilities> {
    const filtersParam = productUnitPairs
      .map((pair) => `${pair.productCode}:${pair.unitCode}`)
      .join(';');

    const availabilityUrl = this.occEndpoints.buildUrl(
      'productAvailabilities',
      {
        queryParams: { filters: filtersParam },
      }
    );

    return this.http.get<ProductAvailabilities>(availabilityUrl).pipe(
      take(1),
      catchError(() => of({ availabilityItems: [] } as ProductAvailabilities))
    );
  }
}
