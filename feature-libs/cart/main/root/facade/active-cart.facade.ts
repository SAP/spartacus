import { Injectable } from '@angular/core';
import {
  Cart,
  facadeFactory,
  OrderEntry,
  StateUtils,
  User,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: ActiveCartFacade,
      feature: CART_CORE_FEATURE,
      methods: [
        'getActive',
        'getActiveCartId',
        'getEntries',
        'getLastEntry',
        'getLoading',
        'isStable',
        'addEntry',
        'removeEntry',
        'updateEntry',
        'getEntry',
        'addEmail',
        'getAssignedUser',
        'isGuestCart',
        'addEntries',
        'requireLoadedCart',
      ],
      async: true,
    }),
})
export abstract class ActiveCartFacade {
  /**
   * Returns active cart
   */
  abstract getActive(): Observable<Cart>;

  /**
   * Returns active cart id
   */
  abstract getActiveCartId(): Observable<string>;

  /**
   * Returns cart entries
   */
  abstract getEntries(): Observable<OrderEntry[]>;

  /**
   * Returns last cart entry for provided product code.
   * Needed to cover processes where multiple entries can share the same product code
   * (e.g. promotions or configurable products)
   *
   * @param productCode
   */
  abstract getLastEntry(productCode: string): Observable<OrderEntry>;

  /**
   * Returns cart loading state
   */
  abstract getLoading(): Observable<boolean>;

  /**
   * Returns true when cart is stable (not loading and not pending processes on cart)
   */
  abstract isStable(): Observable<boolean>;

  /**
   * Add entry to active cart
   *
   * @param productCode
   * @param quantity
   */
  abstract addEntry(productCode: string, quantity: number): void;

  /**
   * Remove entry
   *
   * @param entry
   */
  abstract removeEntry(entry: OrderEntry): void;

  /**
   * Update entry
   *
   * @param entryNumber
   * @param quantity
   */
  abstract updateEntry(entryNumber: number, quantity: number): void;

  /**
   * Returns cart entry
   *
   * @param productCode
   */
  abstract getEntry(productCode: string): Observable<OrderEntry>;

  /**
   * Assign email to cart
   *
   * @param email
   */
  abstract addEmail(email: string): void;

  /**
   * Get assigned user to cart
   */
  abstract getAssignedUser(): Observable<User>;

  /**
   * Returns true for guest cart
   */
  abstract isGuestCart(cart?: Cart): boolean;

  /**
   * Add multiple entries to a cart
   *
   * @param cartEntries : list of entries to add (OrderEntry[])
   */
  abstract addEntries(cartEntries: OrderEntry[]): void;

  abstract requireLoadedCart(
    customCartSelector$?: Observable<StateUtils.ProcessesLoaderState<Cart>>
  ): Observable<StateUtils.ProcessesLoaderState<Cart>>;
}
