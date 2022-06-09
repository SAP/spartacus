import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  GeoPoint,
  Occ,
  OccEndpointsService,
  PointOfService,
  POINT_OF_SERVICE_NORMALIZER,
  SearchConfig,
} from '@spartacus/core';
import {
  StoreCount,
  StoreFinderAdapter,
  StoreFinderSearchPage,
  STORE_COUNT_NORMALIZER,
  STORE_FINDER_SEARCH_PAGE_NORMALIZER,
} from '@spartacus/storefinder/core';
import { StockAdapter } from 'feature-libs/pickup-in-store/core/connectors/stock.adapter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OccStockAdapter implements StockAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  loadStockLevels(productCode: string): Observable<any> {
    return this.http
      .get<Occ.PointOfService>(
        this.occEndpointsService.buildUrl('products', {
          urlParams: { productCode },
        })
      )
      // .pipe(this.converterService.pipeable(POINT_OF_SERVICE_NORMALIZER));
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
