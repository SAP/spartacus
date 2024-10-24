/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  Cart,
  CartType,
  MultiCartFacade,
  OrderEntry,
} from '@spartacus/cart/base/root';
import {
  isNotUndefined,
  StateUtils,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { Observable, of, timer } from 'rxjs';
import {
  debounce,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { CartActions } from '../store/actions/index';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartSelectors } from '../store/selectors/index';

@Injectable()
export class MultiCartService implements MultiCartFacade {
  protected windowRef = inject(WindowRef);

  constructor(
    protected store: Store<StateWithMultiCart>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Returns cart from store as an observable
   *
   * @param cartId
   */
  getCart(cartId: string): Observable<Cart> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartSelectorFactory(cartId))
    );
  }

  /**
   * Returns a list of carts from store as an observable
   *
   */
  getCarts(): Observable<Cart[]> {
    return this.store.pipe(select(MultiCartSelectors.getCartsSelectorFactory));
  }

  /**
   * Returns cart entity from store (cart with loading, error, success flags) as an observable
   *
   * @param cartId
   */
  getCartEntity(
    cartId: string
  ): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartEntitySelectorFactory(cartId))
    );
  }

  /**
   * Returns true when there are no operations on that in progress and it is not currently loading
   *
   * @param cartId
   */
  isStable(cartId: string): Observable<boolean> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartIsStableSelectorFactory(cartId)),
      // We dispatch a lot of actions just after finishing some process or loading, so we want this flag not to flicker.
      // This flickering should only be avoided when switching from false to true
      // Start of loading should be showed instantly (no debounce)
      // Extra actions are only dispatched after some loading
      debounce((isStable) => (isStable ? timer(0) : of(undefined))),
      distinctUntilChanged()
    );
  }

  /**
   * Simple random temp cart id generator
   */
  protected generateTempCartId(): string {
    const array = new Uint32Array(1);
    // This will not work in SSR because 'window' is only available in the browser (client-side).
    this.windowRef.nativeWindow?.crypto.getRandomValues(array);
    const pseudoUuid = array[0].toString(36).substring(2, 11);
    return `temp-${pseudoUuid}`;
  }

  /**
   * Create or merge cart
   *
   * @param params Object with userId, oldCartId, toMergeCartGuid and extraData
   */
  createCart({
    userId,
    oldCartId,
    toMergeCartGuid,
    extraData,
  }: {
    userId: string;
    oldCartId?: string;
    toMergeCartGuid?: string;
    extraData?: {
      active?: boolean;
    };
  }): Observable<Cart> {
    // to support creating multiple carts at the same time we need to use different entity for every process
    // simple random uuid generator is used here for entity names
    const tempCartId = this.generateTempCartId();
    this.store.dispatch(
      new CartActions.CreateCart({
        extraData,
        userId,
        oldCartId,
        toMergeCartGuid,
        tempCartId,
      })
    );

    return this.getCartIdByType(
      extraData?.active ? CartType.ACTIVE : CartType.NEW_CREATED
    ).pipe(
      switchMap((cartId) => this.getCart(cartId)),
      filter(isNotUndefined)
    );
  }

  /**
   * Merge provided cart to current user cart
   *
   * @param params Object with userId, cartId and extraData
   */
  mergeToCurrentCart({
    userId,
    cartId,
    extraData,
  }: {
    userId: string;
    cartId: string;
    extraData?: {
      active?: boolean;
    };
  }) {
    const tempCartId = this.generateTempCartId();
    this.store.dispatch(
      new CartActions.MergeCart({
        userId,
        cartId,
        extraData,
        tempCartId,
      })
    );
  }

  /**
   * Load cart
   *
   * @param params Object with userId, cartId and extraData
   */
  loadCart({
    cartId,
    userId,
    extraData,
  }: {
    cartId: string;
    userId: string;
    extraData?: any;
  }): void {
    this.store.dispatch(
      new CartActions.LoadCart({
        userId,
        cartId,
        extraData,
      })
    );
  }

  /**
   * Get cart entries as an observable
   * @param cartId
   */
  getEntries(cartId: string): Observable<OrderEntry[]> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartEntriesSelectorFactory(cartId))
    );
  }

  /**
   * Get last entry for specific product code from cart.
   * Needed to cover processes where multiple entries can share the same product code
   * (e.g. promotions or configurable products)
   *
   * @param cartId
   * @param productCode
   */
  getLastEntry(
    cartId: string,
    productCode: string
  ): Observable<OrderEntry | undefined> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartEntriesSelectorFactory(cartId)),
      map((entries) => {
        const filteredEntries = entries.filter(
          (entry) => entry.product?.code === productCode
        );
        return filteredEntries
          ? filteredEntries[filteredEntries.length - 1]
          : undefined;
      })
    );
  }

  /**
   * Add entry to cart
   *
   * @param userId
   * @param cartId
   * @param productCode
   * @param quantity
   * @param pickupStore
   */
  addEntry(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    pickupStore?: string
  ): void {
    this.store.dispatch(
      new CartActions.CartAddEntry({
        userId,
        cartId,
        productCode,
        quantity,
        pickupStore,
      })
    );
  }

  /**
   * Add multiple entries to cart
   *
   * @param userId
   * @param cartId
   * @param products Array with items (productCode and quantity)
   */
  addEntries(
    userId: string,
    cartId: string,
    products: Array<{ productCode: string; quantity: number }>
  ): void {
    products.forEach((product) => {
      this.store.dispatch(
        new CartActions.CartAddEntry({
          userId,
          cartId,
          productCode: product.productCode,
          quantity: product.quantity,
        })
      );
    });
  }

  /**
   * Remove entry from cart
   *
   * @param userId
   * @param cartId
   * @param entryNumber
   */
  removeEntry(userId: string, cartId: string, entryNumber: number): void {
    this.store.dispatch(
      new CartActions.CartRemoveEntry({
        userId,
        cartId,
        entryNumber: `${entryNumber}`,
      })
    );
  }

  /**
   * Update entry in cart. For quantity = 0 it removes entry
   *
   * @param userId
   * @param cartId
   * @param entryNumber
   * @param quantity
   * @param pickupStore
   * @param pickupToDelivery
   */
  updateEntry(
    userId: string,
    cartId: string,
    entryNumber: number,
    quantity?: number,
    pickupStore?: string,
    pickupToDelivery: boolean = false
  ): void {
    if (quantity !== undefined && quantity <= 0) {
      this.removeEntry(userId, cartId, entryNumber);
    } else {
      this.store.dispatch(
        new CartActions.CartUpdateEntry({
          userId,
          cartId,
          pickupStore,
          pickupToDelivery,
          entryNumber: `${entryNumber}`,
          quantity: quantity,
        })
      );
    }
  }

  /**
   * Get first entry from cart matching the specified product code
   *
   * @param cartId
   * @param productCode
   */
  getEntry(
    cartId: string,
    productCode: string
  ): Observable<OrderEntry | undefined> {
    return this.store.pipe(
      select(
        MultiCartSelectors.getCartEntrySelectorFactory(cartId, productCode)
      )
    );
  }

  /**
   * Assign email to the cart
   *
   * @param cartId
   * @param userId
   * @param email
   */
  assignEmail(cartId: string, userId: string, email: string): void {
    this.store.dispatch(
      new CartActions.AddEmailToCart({
        userId,
        cartId,
        email,
      })
    );
  }

  removeCart(cartId: string): void {
    this.store.dispatch(new CartActions.RemoveCart({ cartId }));
  }

  /**
   * Delete cart
   *
   * @param cartId
   * @param userId
   */
  deleteCart(cartId: string, userId: string): void {
    this.store.dispatch(
      new CartActions.DeleteCart({
        userId,
        cartId,
      })
    );
  }

  /**
   * Reloads the cart with specified id.
   *
   * @param cartId
   * @param extraData
   */
  reloadCart(cartId: string, extraData?: { active: boolean }): void {
    this.userIdService.takeUserId().subscribe((userId) =>
      this.store.dispatch(
        new CartActions.LoadCart({
          userId,
          cartId,
          extraData,
        })
      )
    );
  }

  /**
   * Get the cart id based on cart type
   *
   * @param cartType
   */
  getCartIdByType(cartType: CartType): Observable<string> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartIdByTypeFactory(cartType)),
      distinctUntilChanged()
    );
  }
}
