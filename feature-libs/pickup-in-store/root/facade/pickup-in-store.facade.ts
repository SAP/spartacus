import { Injectable } from '@angular/core';
import {
  facadeFactory,
  PointOfServiceStock,
  StoreFinderStockSearchPage,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';
import { StockLocationSearchParams } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: PickupInStoreFacade,
      feature: PICKUP_IN_STORE_CORE_FEATURE,
      methods: [
        'getStock',
        'clearStockData',
        'hideOutOfStock',
        'getHideOutOfStockState',
        'getStockLoading',
        'getStockSuccess',
        'getSearchHasBeenPerformed',
        'getStockEntities',
        'getStores',
      ],
      async: true,
    }),
})
export abstract class PickupInStoreFacade {
  abstract getStock(searchParams: StockLocationSearchParams): void;
  abstract clearStockData(): void;
  abstract hideOutOfStock(): void;
  abstract getHideOutOfStockState(): Observable<boolean>;
  abstract getStockLoading(): Observable<boolean>;
  abstract getStockSuccess(): Observable<boolean>;
  abstract getSearchHasBeenPerformed(): Observable<boolean>;
  abstract getStockEntities(): Observable<StoreFinderStockSearchPage>;
  abstract getStores(): Observable<PointOfServiceStock[]>;
}
