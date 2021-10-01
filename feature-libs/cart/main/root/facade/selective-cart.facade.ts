import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { facadeFactory, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: SelectiveCartFacade,
      feature: CART_CORE_FEATURE,
      methods: [
        'getCart',
        'getEntries',
        'isStable',
        'addEntry',
        'removeEntry',
        'updateEntry',
        'getEntry',
        //'isEnabled',
      ],
      async: true,
    }),
})
export abstract class SelectiveCartFacade {
  abstract getCart(): Observable<Cart>;

  abstract getEntries(): Observable<OrderEntry[]>;

  /**
   * Returns true when selective cart is stable (not loading and not pending processes on cart)
   */
  abstract isStable(): Observable<boolean>;

  abstract addEntry(productCode: string, quantity: number): void;

  abstract removeEntry(entry: OrderEntry): void;

  abstract updateEntry(entryNumber: number, quantity: number): void;

  abstract getEntry(productCode: string): Observable<OrderEntry>;

  /**
   * Indicates if selectiveCart feature is enabled based on cart configuration.
   */
  //abstract isEnabled(): boolean;
}
