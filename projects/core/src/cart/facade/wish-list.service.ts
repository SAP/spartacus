import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { Cart } from '../../model';
import { CartActions } from '../store';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartSelectors } from '../store/selectors/index';

@Injectable()
export class WishListService {
  constructor(protected store: Store<StateWithMultiCart>) {}

  createWishList(userId: string, name?: string, description?: string): void {
    this.store.dispatch(
      new CartActions.CreateWishList({ userId, name, description })
    );
  }

  getWishListId(): Observable<string> {
    return this.store.pipe(select(MultiCartSelectors.getWishListId));
  }

  getWishList(userId: string): Observable<Cart> {
    return this.getWishListId().pipe(
      distinctUntilChanged(),
      tap(wishListId => {
        if (!Boolean(wishListId)) {
          this.loadWishList(userId);
        }
      }),
      filter(wishListId => Boolean(wishListId)),
      switchMap(wishListId =>
        this.store.pipe(
          select(MultiCartSelectors.getCartSelectorFactory(wishListId))
        )
      )
    );
  }

  loadWishList(userId: string): void {
    this.store.dispatch(new CartActions.LoadWisthList(userId));
  }
}
