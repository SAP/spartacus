import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, combineLatest, asyncScheduler } from 'rxjs';
import {
  filter,
  debounceTime,
  tap,
  map,
  shareReplay,
  take,
} from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import { CartActions } from '../store/actions/index';
import { CartSelectors } from '../store/selectors/index';
import { SaveForLaterDataService } from './save-for-later-data.service';
import { ANONYMOUS_USERID } from './cart-data.service';
import { StateWithCart } from '../store/cart-state';
import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';

@Injectable()
export class SaveForLaterService {
  private readonly PREVIOUS_USER_ID_INITIAL_VALUE =
    'PREVIOUS_USER_ID_INITIAL_VALUE';
  private previousUserId = this.PREVIOUS_USER_ID_INITIAL_VALUE;
  private _saveForLater$: Observable<Cart>;

  constructor(
    protected store: Store<StateWithCart>,
    protected saveForLaterData: SaveForLaterDataService,
    protected authService: AuthService
  ) {
    this._saveForLater$ = this.loadSaveForLater();
  }

  getSaveForLater(): Observable<Cart> {
    return this._saveForLater$;
  }

  loadSaveForLater(): Observable<Cart> {
    return combineLatest([
      this.store.select(CartSelectors.getSaveForLaterContent),
      this.store.select(CartSelectors.getSaveForLaterLoading),
      this.authService.getUserToken(),
      this.store.select(CartSelectors.getSaveForLaterLoaded),
    ]).pipe(
      // combineLatest emits multiple times on each property update instead of one emit
      // additionally dispatching actions that changes selectors used here needs to happen in order
      // for this asyncScheduler is used here
      debounceTime(1, asyncScheduler),
      filter(([, loading]) => !loading),
      tap(([saveForLater, , userToken, loaded]) => {
        if (
          this.isIncomplete(saveForLater) ||
          this.isJustLoggedIn(userToken.userId)
        ) {
          this.createSaveForLater();
        } else if (
          (this.isCreated(saveForLater) && this.isIncomplete(saveForLater)) ||
          (this.isLoggedIn(userToken.userId) &&
            !this.isCreated(saveForLater) &&
            !loaded) // try to load current cart for logged in user (loaded flag to prevent infinite loop when user doesn't have cart)
        ) {
          this.load();
        }

        this.previousUserId = userToken.userId;
      }),
      filter(
        ([saveForLater]) =>
          !this.isCreated(saveForLater) ||
          (this.isCreated(saveForLater) && !this.isIncomplete(saveForLater))
      ),
      map(([saveForLater]) => saveForLater),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.store.pipe(select(CartSelectors.getSaveForLaterEntries));
  }

  getLoading(): Observable<boolean> {
    return this.store.pipe(select(CartSelectors.getSaveForLaterLoading));
  }

  private createSaveForLater(): void {
    // for login user, whenever there's an existing cart, we will load the user
    // current cart and merge it into the existing cart
    if (!this.isCreated(this.saveForLaterData.saveForLater)) {
      this.store.dispatch(
        new CartActions.CreateSaveForLater({
          userId: this.saveForLaterData.userId,
          cartId: this.saveForLaterData.cartId,
        })
      );
    } else {
      this.store.dispatch(
        new CartActions.LoadSaveForLater({
          userId: this.saveForLaterData.userId,
          cartId: this.saveForLaterData.cartId,
        })
      );
    }
  }

  protected load(): void {
    if (this.saveForLaterData.userId !== ANONYMOUS_USERID) {
      this.store.dispatch(
        new CartActions.LoadSaveForLater({
          userId: this.saveForLaterData.userId,
          cartId: this.saveForLaterData.cartId,
        })
      );
    }
  }

  addEntry(productCode: string, quantity: number): void {
    this.store
      .pipe(
        select(CartSelectors.getSaveForLaterCartState),
        tap(saveForLaterState => {
          if (
            !this.isCreated(saveForLaterState.value.content) &&
            !saveForLaterState.loading
          ) {
            this.store.dispatch(
              new CartActions.CreateSaveForLater({
                userId: this.saveForLaterData.userId,
                cartId: this.saveForLaterData.cartId,
              })
            );
          }
        }),
        filter(saveForLaterState =>
          this.isCreated(saveForLaterState.value.content)
        ),
        take(1)
      )
      .subscribe(_ => {
        this.store.dispatch(
          new CartActions.CartAddEntry({
            userId: this.saveForLaterData.userId,
            cartId: this.saveForLaterData.cartId,
            productCode: productCode,
            quantity: quantity,
            isSaveForLater: true,
          })
        );
      });
  }

  removeEntry(entry: OrderEntry): void {
    this.store.dispatch(
      new CartActions.CartRemoveEntry({
        userId: this.saveForLaterData.userId,
        cartId: this.saveForLaterData.cartId,
        entry: entry.entryNumber,
        isSaveForLater: true,
      })
    );
  }

  updateEntry(entryNumber: string, quantity: number): void {
    if (quantity > 0) {
      this.store.dispatch(
        new CartActions.CartUpdateEntry({
          userId: this.saveForLaterData.userId,
          cartId: this.saveForLaterData.cartId,
          entry: entryNumber,
          qty: quantity,
          isSaveForLater: true,
        })
      );
    } else {
      this.store.dispatch(
        new CartActions.CartRemoveEntry({
          userId: this.saveForLaterData.userId,
          cartId: this.saveForLaterData.cartId,
          entry: entryNumber,
          isSaveForLater: true,
        })
      );
    }
  }

  getEntry(productCode: string): Observable<OrderEntry> {
    return this.store.pipe(
      select(CartSelectors.getSaveForLaterEntrySelectorFactory(productCode))
    );
  }

  private isCreated(cart: Cart): boolean {
    return cart && typeof cart.guid !== 'undefined';
  }

  private isIncomplete(cart: Cart): boolean {
    return cart && Object.keys(cart).length <= 2;
  }

  private isJustLoggedIn(userId: string): boolean {
    return (
      this.isLoggedIn(userId) &&
      this.previousUserId !== userId && // *just* logged in
      this.previousUserId !== this.PREVIOUS_USER_ID_INITIAL_VALUE // not app initialization
    );
  }

  private isLoggedIn(userId: string): boolean {
    return typeof userId !== 'undefined';
  }
}
