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
  private _saveForLater$: Observable<Cart>;

  constructor(
    protected store: Store<StateWithCart>,
    protected saveForLaterData: SaveForLaterDataService,
    protected authService: AuthService
  ) {
    this.init();
  }

  getSaveForLater(): Observable<Cart> {
    return this._saveForLater$;
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.store.pipe(select(CartSelectors.getSaveForLaterEntries));
  }

  getLoaded(): Observable<boolean> {
    return this.store.pipe(select(CartSelectors.getSaveForLaterLoaded));
  }

  protected init(): void {
    this._saveForLater$ = combineLatest([
      this.store.select(CartSelectors.getSaveForLaterContent),
      this.store.select(CartSelectors.getSaveForLaterLoading),
      this.authService.getUserToken(),
      this.store.select(CartSelectors.getCartLoaded),
    ]).pipe(
      // copied from cart service, save for later only used for logged in customer
      debounceTime(1, asyncScheduler),
      filter(([, loading]) => !loading),
      tap(([saveForLater, , userToken, loaded]) => {
        if (
          this.isLoggedIn(userToken.userId) &&
          !this.isCreated(saveForLater) &&
          !loaded
        ) {
          this.load();
        }
      }),
      filter(
        ([cart]) =>
          !this.isCreated(cart) ||
          (this.isCreated(cart) && !this.isIncomplete(cart))
      ),
      map(([cart]) => cart),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  protected load(): void {
    if (this.saveForLaterData.userId !== ANONYMOUS_USERID) {
      if (this.isCreated(this.saveForLaterData.saveForLater)) {
        this.store.dispatch(
          new CartActions.LoadSaveForLater({
            userId: this.saveForLaterData.userId,
            cartId: this.saveForLaterData.cartId,
          })
        );
      } else {
        this.store.dispatch(
          new CartActions.CreateSaveForLater({
            userId: this.saveForLaterData.userId,
            cartId: this.saveForLaterData.cartId,
          })
        );
      }
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
        })
      );
    } else {
      this.store.dispatch(
        new CartActions.CartRemoveEntry({
          userId: this.saveForLaterData.userId,
          cartId: this.saveForLaterData.cartId,
          entry: entryNumber,
        })
      );
    }
  }

  getEntry(productCode: string): Observable<OrderEntry> {
    return this.store.pipe(
      select(CartSelectors.getCartEntrySelectorFactory(productCode))
    );
  }

  isCreated(cart: Cart): boolean {
    return cart && !!Object.keys(cart).length;
  }

  private isLoggedIn(userId: string): boolean {
    return typeof userId !== 'undefined';
  }

  private isIncomplete(cart: Cart): boolean {
    return cart && Object.keys(cart).length <= 2;
  }
}
