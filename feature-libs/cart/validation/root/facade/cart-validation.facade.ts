import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facadeFactory, CartModification } from '@spartacus/core';
import { CART_VALIDATION_CORE_FEATURE } from '../feature-name';

export function cartValidationFacadeFactory() {
  return facadeFactory({
    facade: CartValidationFacade,
    feature: CART_VALIDATION_CORE_FEATURE,
    methods: ['validate'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: cartValidationFacadeFactory,
})
export abstract class CartValidationFacade {
  abstract validate(): Observable<CartModification | undefined>;
}
