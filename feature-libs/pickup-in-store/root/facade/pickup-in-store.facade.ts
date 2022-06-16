/* -----
@Todo - Remove this after adding adding functionalities which will improve code coverage for functions
------*/
/*istanbul ignore file*/

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import {
  StockEntities,
  StockLocationSearchParams,
} from '@spartacus/pickup-in-store/core';
import { Observable } from 'rxjs';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: PickupInStoreFacade,
      feature: PICKUP_IN_STORE_CORE_FEATURE,
      methods: ['getStore', 'getStockEntities'],
      async: true,
    }),
})
export abstract class PickupInStoreFacade {
  abstract getStore(searchParams: StockLocationSearchParams): void;
  abstract getStockEntities(): Observable<StockEntities>;
}
