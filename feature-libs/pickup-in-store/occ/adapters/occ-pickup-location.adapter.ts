import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  OccEndpointsService,
  PointOfService,
} from '@spartacus/core';
import { PickupLocationAdapter } from '@spartacus/pickup-in-store/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccPickupLocationAdapter implements PickupLocationAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.http.get<PointOfService>(
      this.occEndpointsService.buildUrl('storeDetails', {
        urlParams: { storeName },
      })
    );
  }
}
