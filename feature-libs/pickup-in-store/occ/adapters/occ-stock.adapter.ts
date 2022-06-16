import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, Occ, OccEndpointsService } from '@spartacus/core';
import { StockAdapter } from '@spartacus/pickup-in-store/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccStockAdapter implements StockAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  loadStockLevels(productCode: string, location: any): Observable<any> {
    return this.http.get<Occ.PointOfService>(
      this.occEndpointsService.buildUrl('stock', {
        urlParams: { productCode },
        queryParams: { ...location, fields: 'FULL' },
      })
    );
  }
  // search(
  //   query: string,
  //   searchConfig: SearchConfig,
  //   longitudeLatitude?: GeoPoint,
  //   radius?: number
  // ): Observable<StoreFinderSearchPage> {
  //   return this.callOccFindStores(
  //     query,
  //     searchConfig,
  //     longitudeLatitude,
  //     radius
  //   ).pipe(this.converterService.pipeable(STORE_FINDER_SEARCH_PAGE_NORMALIZER));
  // }

  // loadCounts(): Observable<StoreCount[]> {
  //   return this.http
  //     .get<Occ.StoreCountList>(
  //       this.occEndpointsService.buildUrl('storescounts')
  //     )
  //     .pipe(
  //       map(
  //         ({ countriesAndRegionsStoreCount }) => countriesAndRegionsStoreCount
  //       ),
  //       this.converterService.pipeableMany(STORE_COUNT_NORMALIZER)
  //     );
  // }

  // load(storeId: string): Observable<PointOfService> {
  //   return this.http
  //     .get<Occ.PointOfService>(
  //       this.occEndpointsService.buildUrl('store', { urlParams: { storeId } })
  //     )
  //     .pipe(this.converterService.pipeable(POINT_OF_SERVICE_NORMALIZER));
  // }
}
