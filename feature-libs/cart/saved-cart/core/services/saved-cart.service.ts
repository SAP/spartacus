import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  Cart,
  getWishlistName,
  MultiCartSelectors,
  ProcessSelectors,
  StateUtils,
  StateWithMultiCart,
  StateWithProcess,
  UserIdService,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  pluck,
  shareReplay,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { SAVED_CART_LIST_PROCESS_ID } from '../store';
import { SavedCartActions } from '../store/actions/index';

@Injectable({
  providedIn: 'root',
})
export class SavedCartService {
  constructor(
    protected store: Store<StateWithMultiCart | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected userService: UserService
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

  getList(): Observable<Cart[]> {
    return this.getSavedCartList().pipe(
      withLatestFrom(this.getSavedCartListProcess()),
      tap(([_, state]) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadSavedCarts();
        }
      }),
      pluck(0),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getSavedCartList(): Observable<Cart[]> {
    return combineLatest([
      this.store.select(MultiCartSelectors.getCartValueList),
      this.userService.get(),
    ]).pipe(
      distinctUntilChanged(),
      map(([carts, user]) =>
        carts.filter(
          (cart) =>
            cart?.name !== getWishlistName(user?.customerId) && cart?.saveTime
        )
      )
    );
  }

  getSavedCartListProcess(): Observable<StateUtils.LoaderState<any>> {
    return this.store.pipe(
      select(
        ProcessSelectors.getProcessStateFactory(SAVED_CART_LIST_PROCESS_ID)
      )
    );
  }

  clearSavedCarts(): void {
    this.store.dispatch(new SavedCartActions.ClearSavedCarts());
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
