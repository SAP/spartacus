import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: ClearCheckoutFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: ['resetCheckoutProcesses'],
      async: true,
    }),
})
export abstract class ClearCheckoutFacade {
  /**
   * Use it to clear checkout state
   */
  abstract resetCheckoutProcesses(): void;
}
