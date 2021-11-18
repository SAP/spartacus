import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Cart, MultiCartFacade, OrderEntry, WishListFacade } from '@spartacus/cart/main/root';
import {
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CartActions } from '../store/actions/index';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartSelectors } from '../store/selectors/index';
import { getWishlistName } from '../utils/utils';

@Injectable()
export class WishListService implements WishListFacade {
  constructor(
    protected store: Store<StateWithMultiCart>,
    protected userService: UserService,
    protected multiCartFacade: MultiCartFacade,
    protected userIdService: UserIdService
  ) {}

  createWishList(userId: string, name?: string, description?: string): void {
    this.store.dispatch(
      new CartActions.CreateWishList({ userId, name, description })
    );
  }

  getWishList(): Observable<Cart> {
    return combineLatest([
      this.getWishListId(),
      this.userService.get(),
      this.userIdService.getUserId(),
    ]).pipe(
      distinctUntilChanged(),
      tap(([wishListId, user, userId]) => {
        if (
          !Boolean(wishListId) &&
          userId !== OCC_USER_ID_ANONYMOUS &&
          user &&
          user.customerId
        ) {
          this.loadWishList(userId, user.customerId);
        }
      }),
      filter(([wishListId]) => Boolean(wishListId)),
      switchMap(([wishListId]) => this.multiCartFacade.getCart(wishListId))
    );
  }

  loadWishList(userId: string, customerId: string): void {
    this.store.dispatch(
      new CartActions.LoadWishList({
        userId,
        customerId,
        tempCartId: getWishlistName(customerId),
      })
    );
  }

  addEntry(productCode: string): void {
    this.getWishListId()
      .pipe(
        distinctUntilChanged(),
        withLatestFrom(this.userIdService.getUserId(), this.userService.get()),
        tap(([wishListId, userId, user]) => {
          if (!Boolean(wishListId) && user && user.customerId) {
            this.loadWishList(userId, user.customerId);
          }
        }),
        filter(([wishListId]) => Boolean(wishListId)),
        take(1)
      )
      .subscribe(([wishListId, userId]) =>
        this.multiCartFacade.addEntry(userId, wishListId, productCode, 1)
      );
  }

  removeEntry(entry: OrderEntry): void {
    this.getWishListId()
      .pipe(
        distinctUntilChanged(),
        withLatestFrom(this.userIdService.getUserId(), this.userService.get()),
        tap(([wishListId, userId, user]) => {
          if (!Boolean(wishListId) && user && user.customerId) {
            this.loadWishList(userId, user.customerId);
          }
        }),
        filter(([wishListId]) => Boolean(wishListId)),
        take(1)
      )
      .subscribe(([wishListId, userId]) =>
        this.multiCartFacade.removeEntry(
          userId,
          wishListId,
          entry.entryNumber as number
        )
      );
  }

  getWishListLoading(): Observable<boolean> {
    return this.getWishListId().pipe(
      switchMap((wishListId) =>
        this.multiCartFacade
          .isStable(wishListId)
          .pipe(map((stable) => !stable))
      )
    );
  }

  protected getWishListId(): Observable<string> {
    return this.store.pipe(select(MultiCartSelectors.getWishListId));
  }
}
