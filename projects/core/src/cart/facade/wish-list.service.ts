import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { Cart, OrderEntry } from '../../model/index';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { CartActions } from '../store/actions/index';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartSelectors } from '../store/selectors/index';
import { MultiCartService } from './multi-cart.service';

@Injectable()
export class WishListService {
  constructor(
    protected store: Store<StateWithMultiCart>,
    protected authService: AuthService,
    protected multiCartService: MultiCartService
  ) {}

  createWishList(userId: string, name?: string, description?: string): void {
    this.store.dispatch(
      new CartActions.CreateWishList({ userId, name, description })
    );
  }

  getWishList(): Observable<Cart> {
    return this.getWishListId().pipe(
      distinctUntilChanged(),
      withLatestFrom(this.authService.getOccUserId()),
      tap(([wishListId, userId]) => {
        if (!Boolean(wishListId) && userId !== OCC_USER_ID_ANONYMOUS) {
          this.loadWishList(userId);
        }
      }),
      filter(([wishListId]) => Boolean(wishListId)),
      switchMap(([wishListId]) => this.multiCartService.getCart(wishListId))
    );
  }

  loadWishList(userId: string): void {
    this.store.dispatch(new CartActions.LoadWisthList(userId));
  }

  addEntry(productCode: string): void {
    this.getWishListId()
      .pipe(
        distinctUntilChanged(),
        withLatestFrom(this.authService.getOccUserId()),
        tap(([wishListId, userId]) => {
          if (!Boolean(wishListId)) {
            this.loadWishList(userId);
          }
        }),
        filter(([wishListId]) => Boolean(wishListId)),
        take(1)
      )
      .subscribe(([wishListId, userId]) =>
        this.multiCartService.addEntry(userId, wishListId, productCode, 1)
      );
  }

  removeEntry(entry: OrderEntry): void {
    this.getWishListId()
      .pipe(
        distinctUntilChanged(),
        withLatestFrom(this.authService.getOccUserId()),
        tap(([wishListId, userId]) => {
          if (!Boolean(wishListId)) {
            this.loadWishList(userId);
          }
        }),
        filter(([wishListId]) => Boolean(wishListId)),
        take(1)
      )
      .subscribe(([wishListId, userId]) =>
        this.multiCartService.removeEntry(userId, wishListId, entry.entryNumber)
      );
  }

  getWishListLoading(): Observable<boolean> {
    return this.getWishListId().pipe(
      switchMap(wishListId =>
        this.multiCartService.isStable(wishListId).pipe(map(stable => !stable))
      )
    );
  }

  protected getWishListId(): Observable<string> {
    return this.store.pipe(select(MultiCartSelectors.getWishListId));
  }
}
