import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Cart,
  MultiCartSelectors,
  MultiCartService,
  OCC_SAVED_CART_ID,
  StateUtils,
  StateWithMultiCart,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, tap } from 'rxjs/operators';
import { SavedCartActions } from '../store/actions/index';

@Injectable({
  providedIn: 'root',
})
export class SavedCartService {
  constructor(
    protected store: Store<StateWithMultiCart>,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService
  ) {}

  loadSavedCarts(): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.LoadSavedCarts({ userId })
        );
      },
      () => {}
    );
  }

  getList(): Observable<Cart | undefined> {
    return this.multiCartService.getCartEntity(OCC_SAVED_CART_ID).pipe(
      observeOn(queueScheduler),
      tap((state: StateUtils.ProcessesLoaderState<Cart>) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadSavedCarts();
        }
      }),
      filter(
        (state: StateUtils.ProcessesLoaderState<Cart>) =>
          state.success || state.error
      ),
      map((result) => result.value)
    );
  }

  getSavedCartList(): Observable<Cart[]> {
    return this.store
      .select(MultiCartSelectors.getCartValueList)
      .pipe(map((carts) => carts.filter((cart) => cart?.saveTime)));
  }

  restoreSavedCart(cartId: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.RestoreSavedCart({ userId, cartId })
        );
      },
      () => {}
    );
  }
}
