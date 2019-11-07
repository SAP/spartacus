import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from '../store';
import { StateWithMultiCart } from '../store/multi-cart-state';

@Injectable()
export class WishListService {
  constructor(protected store: Store<StateWithMultiCart>) {}

  createWishList(userId: string, name?: string, description?: string): void {
    this.store.dispatch(
      new CartActions.CreateWishList({ userId, name, description })
    );
  }
}
