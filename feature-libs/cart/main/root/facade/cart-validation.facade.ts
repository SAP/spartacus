import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_CORE_FEATURE } from '../feature-name';
import { CartModification, CartModificationList } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CartValidationFacade,
      feature: CART_CORE_FEATURE,
      methods: ['validateCart'],
    }),
})
export abstract class CartValidationFacade {
  /**
   * Validate cart, and returns cart modification list.
   */
  abstract validateCart(): Observable<CartModificationList>;

  /**
   * Returns cart modification results
   */
  abstract getValidationResults(): Observable<CartModification[]>;
}
