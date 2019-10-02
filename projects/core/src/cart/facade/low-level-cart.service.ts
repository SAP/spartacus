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
export class LowLevelCartService {
  constructor(protected store: Store<StateWithMultiCart>) {}

  // TODO: docs for methods
  getCart(cartId: string): Observable<Cart> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartSelectorFactory(cartId))
    );
  }

  getCartEntity(cartId: string): Observable<LoaderState<Cart>> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartEntitySelectorFactory(cartId))
    );
  }

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
    return this.getCartEntity('fresh');
  }

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

  getEntries(cartId: string): Observable<OrderEntry[]> {
    return this.store.pipe(
      select(MultiCartSelectors.getCartEntriesSelectorFactory(cartId))
    );
  }

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

  removeEntry(userId: string, cartId: string, entryNumber: number): void {
    this.store.dispatch(
      new CartActions.CartRemoveEntry({
        userId,
        cartId,
        entry: entryNumber,
      })
    );
  }

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

  getEntry(cartId: string, productCode: string): Observable<OrderEntry | null> {
    return this.store.pipe(
      select(
        MultiCartSelectors.getCartEntrySelectorFactory(cartId, productCode)
      )
    );
  }
}
