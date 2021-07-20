import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

export function clearCheckoutFacadeFactory() {
  return facadeFactory({
    facade: ClearCheckoutFacade,
    feature: CHECKOUT_CORE_FEATURE,
    methods: ['resetCheckoutProcesses'],
    async: true,
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: clearCheckoutFacadeFactory,
})
export abstract class ClearCheckoutFacade {
  /**
   * Use it to clear checkout state
   */
  abstract resetCheckoutProcesses(): void;
}
