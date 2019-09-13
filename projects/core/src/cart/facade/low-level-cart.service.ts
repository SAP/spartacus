import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderEntry } from '../../model/order.model';
import { CartActions } from '../store/actions/index';
import { StateWithMultiCart, NewCartState } from '../store/cart-state';
import { CartDataService } from './cart-data.service';
import { LoadCart } from '../store/actions/cart.action';
import { MultiCartSelectors } from '../store/selectors/index';
import { LoaderState } from '../../state';

@Injectable()
export class LowLevelCartService {
  constructor(
    protected store: Store<StateWithMultiCart>,
    protected cartData: CartDataService
  ) {}

  // finished
  getCart(cartId: string): Observable<NewCartState> {
    return this.store.pipe(select(MultiCartSelectors.getCartSelectorFactory(cartId)));
  }

  // finished
  getCartEntity(cartId: string): Observable<LoaderState<NewCartState>> {
    return this.store.pipe(select(MultiCartSelectors.getCartEntitySelectorFactory(cartId)));
  }

  // finished
  createCart(userId: string, oldCartId?: string, toMergeCartGuid?: string): Observable<LoaderState<NewCartState>> {
    this.store.dispatch(new CartActions.ResetFreshCart())
    this.store.dispatch(new CartActions.CreateCart({
      userId,
      oldCartId,
      toMergeCartGuid,
    }));
    return this.getCartEntity('fresh');
  }

  // finished
  loadCart(cartId: string, userId: string): void {
    this.store.dispatch(new LoadCart({
      userId,
      cartId
    }));
  }

  // finished
  getEntries(cartId: string): Observable<OrderEntry[]> {
    return this.store.pipe(select(MultiCartSelectors.getCartEntriesSelectorFactory(cartId)));
  }

  // finished
  addEntry(userId: string, cartId: string, productCode: string, quantity: number): void {
    this.store.dispatch(
        new CartActions.CartAddEntry({
            userId,
            cartId,
            productCode,
            quantity,
          })
        );
  }

  // finished
  removeEntry(userId: string, cartId: string, entryNumber: string): void {
    this.store.dispatch(
      new CartActions.CartRemoveEntry({
        userId,
        cartId,
        entry: entryNumber,
      })
    );
  }

  // finished
  updateEntry(userId: string, cartId: string, entryNumber: string, quantity: number): void {
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

  // finished
  getEntry(cartId: string, productCode: string): Observable<OrderEntry | null> {
    return this.store.pipe(select(MultiCartSelectors.getCartEntrySelectorFactory(cartId, productCode)));
  }
}
