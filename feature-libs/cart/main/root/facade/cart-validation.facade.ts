import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_CORE_FEATURE } from '../feature-name';
import { CartModificationList } from '../models/cart.model';

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
   * Returns cart modification list.
   *
   * @param cartId
   * @param userId
   */
  abstract validateCart(): Observable<CartModificationList>;
}
