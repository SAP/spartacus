import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facadeFactory } from '@spartacus/core';
import { CART_VALIDATION_FEATURE } from '../feature-name';
import { CartModificationList } from '../model';

export function cartValidationFacadeFactory() {
  return facadeFactory({
    facade: CartValidationFacade,
    feature: CART_VALIDATION_FEATURE,
    methods: ['getCartValidationStatus'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: cartValidationFacadeFactory,
})
export abstract class CartValidationFacade {
  abstract getCartValidationStatus(): Observable<CartModificationList | undefined>;
}
