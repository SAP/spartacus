import { Injectable } from '@angular/core';
import { facadeFactory, PointOfServiceStock } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';
import { StockLocationSearchParams } from '../model';

// TODO jsdoc

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: PickupLocationsSearchFacade,
      feature: PICKUP_IN_STORE_CORE_FEATURE,
      methods: [
        'startSearch',
        'hasSearchStarted',
        'isSearchRunning',
        'getSearchResults',
        'clearSearchResults',
        'getHideOutOfStock',
        'setBrowserLocation',
        'toggleHideOutOfStock',
      ],
      async: true,
    }),
})
export abstract class PickupLocationsSearchFacade {
  abstract startSearch(searchParams: StockLocationSearchParams): void;
  abstract hasSearchStarted(productCode: string): Observable<boolean>;
  abstract isSearchRunning(): Observable<boolean>;
  abstract getSearchResults(
    productCode: string
  ): Observable<PointOfServiceStock[]>;
  abstract clearSearchResults(): void;
  abstract getHideOutOfStock(): Observable<boolean>;
  abstract setBrowserLocation(latitude: number, longitude: number): void;
  abstract toggleHideOutOfStock(): void;
}
