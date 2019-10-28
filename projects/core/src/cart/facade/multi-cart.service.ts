import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderEntry } from '../../model/order.model';
import { CartActions } from '../store/actions/index';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartSelectors } from '../store/selectors/index';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { Cart } from '../../model/cart.model';

@Injectable()
export class MultiCartService {
  constructor(protected store: Store<StateWithMultiCart>) {}

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
   * Returns cart entity from store (cart with loading, error, success flags) as an observable
   *
   * @param cartId
   */
  getCartEntity(cartId: string): Observable<LoaderState<Cart>> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartEntitySelectorFactory(cartId))
    );
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
    extraData?: any;
  }): Observable<LoaderState<Cart>> {
    this.store.dispatch(
      new CartActions.CreateCart({
        extraData,
        userId,
        oldCartId,
        toMergeCartGuid,
      })
    );
    // to keep track of cart creation process we use cart with `fresh` id
    // after creating cart we switch to entity with `code` or `guid`
    // for loading/error state we need `fresh` cart entity
    return this.getCartEntity('fresh');
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
   * Add entry to cart
   *
   * @param userId
   * @param cartId
   * @param productCode
   * @param quantity
   */
  addEntry(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number
  ): void {
    this.store.dispatch(
      new CartActions.CartAddEntry({
        userId,
        cartId,
        productCode,
        quantity,
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
    this.store.dispatch(
      new CartActions.CartAddEntries({
        userId,
        cartId,
        products,
      })
    );
  }

  /**
   * Initialize add entry process used for loading status
   */
  initAddEntryProcess(): void {
    this.store.dispatch(new CartActions.CartStartAddEntryProcess());
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
        entry: entryNumber,
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
   */
  updateEntry(
    userId: string,
    cartId: string,
    entryNumber: number,
    quantity: number
  ): void {
    if (quantity > 0) {
      this.store.dispatch(
        new CartActions.CartUpdateEntry({
          userId,
          cartId,
          entry: entryNumber,
          qty: quantity,
        })
      );
    } else {
      this.removeEntry(userId, cartId, entryNumber);
    }
  }

  /**
   * Get specific entry from cart
   *
   * @param cartId
   * @param productCode
   */
  getEntry(cartId: string, productCode: string): Observable<OrderEntry | null> {
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

  /**
   * Delete cart
   *
   * @param cartId
   * @param userId
   */
  deleteCart(cartId: string, userId: string) {
    this.store.dispatch(
      new CartActions.DeleteCart({
        userId,
        cartId,
      })
    );
  }
}
