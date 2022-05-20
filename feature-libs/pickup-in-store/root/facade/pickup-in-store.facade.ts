/* -----
@Todo - Remove this after adding adding functionalities which will improve code coverage for functions
------*/
/*istanbul ignore file*/

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: PickupInStoreFacade,
      feature: PICKUP_IN_STORE_CORE_FEATURE,
      methods: ['getStore'],
      async: true,
    }),
})
export abstract class PickupInStoreFacade {
  abstract getStore(): void;
}
