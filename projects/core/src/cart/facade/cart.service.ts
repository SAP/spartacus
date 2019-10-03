import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import { Cart } from '../../model/cart.model';
import { User } from '../../model/misc.model';
import { OrderEntry } from '../../model/order.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { CartActions } from '../store/actions/index';
import { StateWithCart } from '../store/cart-state';
import { CartSelectors } from '../store/selectors/index';
import { CartDataService } from './cart-data.service';

@Injectable()
export class CartService {
  private readonly PREVIOUS_USER_ID_INITIAL_VALUE =
    'PREVIOUS_USER_ID_INITIAL_VALUE';
  private previousUserId = this.PREVIOUS_USER_ID_INITIAL_VALUE;
  private _activeCart$: Observable<Cart>;

  constructor(
    protected store: Store<StateWithCart>,
    protected cartData: CartDataService,
    protected authService: AuthService
  ) {
    this._activeCart$ = combineLatest([
      this.store.select(CartSelectors.getCartContent),
      this.store.select(CartSelectors.getCartLoading),
      this.authService.getUserToken(),
      this.store.select(CartSelectors.getCartLoaded),
    ]).pipe(
      // combineLatest emits multiple times on each property update instead of one emit
      // additionally dispatching actions that changes selectors used here needs to happen in order
      // for this asyncScheduler is used here
      debounceTime(0),
      filter(([, loading]) => !loading),
      tap(([cart, , userToken, loaded]) => {
        if (this.isJustLoggedIn(userToken.userId)) {
          this.loadOrMerge();
        } else if (
          (this.isCreated(cart) && this.isIncomplete(cart)) ||
          (this.isLoggedIn(userToken.userId) &&
            !this.isCreated(cart) &&
            !loaded) // try to load current cart for logged in user (loaded flag to prevent infinite loop when user doesn't have cart)
        ) {
          this.load();
        }

        this.previousUserId = userToken.userId;
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

  getActive(): Observable<Cart> {
    return this._activeCart$;
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.store.pipe(select(CartSelectors.getCartEntries));
  }

  getCartMergeComplete(): Observable<boolean> {
    return this.store.pipe(select(CartSelectors.getCartMergeComplete));
  }

  getLoaded(): Observable<boolean> {
    return this.store.pipe(select(CartSelectors.getCartLoaded));
  }

  private loadOrMerge(): void {
    // for login user, whenever there's an existing cart, we will load the user
    // current cart and merge it into the existing cart
    if (!this.isCreated(this.cartData.cart)) {
      this.store.dispatch(
        new CartActions.LoadCart({
          userId: this.cartData.userId,
          cartId: 'current',
        })
      );
    } else if (this.isGuestCart()) {
      this.guestCartMerge();
    } else {
      this.store.dispatch(
        new CartActions.MergeCart({
          userId: this.cartData.userId,
          cartId: this.cartData.cart.guid,
        })
      );
    }
  }

  private load(): void {
    if (this.cartData.userId !== OCC_USER_ID_ANONYMOUS) {
      this.store.dispatch(
        new CartActions.LoadCart({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId ? this.cartData.cartId : 'current',
        })
      );
    } else {
      this.store.dispatch(
        new CartActions.LoadCart({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
        })
      );
    }
  }

  addEntry(productCode: string, quantity: number): void {
    this.store
      .pipe(
        select(CartSelectors.getActiveCartState),
        tap(cartState => {
          if (!this.isCreated(cartState.value.content) && !cartState.loading) {
            this.store.dispatch(
              new CartActions.CreateCart({ userId: this.cartData.userId })
            );
          }
        }),
        filter(cartState => this.isCreated(cartState.value.content)),
        take(1)
      )
      .subscribe(_ => {
        this.store.dispatch(
          new CartActions.CartAddEntry({
            userId: this.cartData.userId,
            cartId: this.cartData.cartId,
            productCode: productCode,
            quantity: quantity,
          })
        );
      });
  }

  removeEntry(entry: OrderEntry): void {
    this.store.dispatch(
      new CartActions.CartRemoveEntry({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId,
        entry: entry.entryNumber,
      })
    );
  }

  updateEntry(entryNumber: string, quantity: number): void {
    if (quantity > 0) {
      this.store.dispatch(
        new CartActions.CartUpdateEntry({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          entry: entryNumber,
          qty: quantity,
        })
      );
    } else {
      this.store.dispatch(
        new CartActions.CartRemoveEntry({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
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

  addEmail(email: string): void {
    this.store.dispatch(
      new CartActions.AddEmailToCart({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId,
        email: email,
      })
    );
  }

  getAssignedUser(): Observable<User> {
    return this.store.pipe(select(CartSelectors.getCartUser));
  }

  isGuestCart(): boolean {
    return this.cartData.isGuestCart;
  }

  /**
   * Add multiple entries to a cart
   * Requires a created cart
   * @param cartEntries : list of entries to add (OrderEntry[])
   */
  addEntries(cartEntries: OrderEntry[]): void {
    let newEntries = 0;
    this.getEntries()
      .pipe(
        tap(() => {
          // Keep adding entries until the user cart contains the same number of entries
          // as the guest cart did
          if (newEntries < cartEntries.length) {
            this.store.dispatch(
              new CartActions.CartAddEntry({
                userId: this.cartData.userId,
                cartId: this.cartData.cartId,
                productCode: cartEntries[newEntries].product.code,
                quantity: cartEntries[newEntries].quantity,
              })
            );
            newEntries++;
          }
        }),
        filter(() => newEntries === cartEntries.length),
        take(1)
      )
      .subscribe();
  }

  private isCreated(cart: Cart): boolean {
    return cart && typeof cart.guid !== 'undefined';
  }

  /**
   * Cart is incomplete if it contains only `guid`, `code` and `user` properties, which come from local storage.
   * To get cart content, we need to load cart from backend.
   */
  private isIncomplete(cart: Cart): boolean {
    return cart && Object.keys(cart).length <= 3;
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

  // TODO: Remove once backend is updated
  /**
   * Temporary method to merge guest cart with user cart because of beackend limitation
   * This is for an edge case
   */
  private guestCartMerge(): void {
    let cartEntries: OrderEntry[];
    this.getEntries()
      .pipe(take(1))
      .subscribe(entries => {
        cartEntries = entries;
      });

    this.store.dispatch(
      new CartActions.DeleteCart({
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: this.cartData.cart.guid,
      })
    );

    this.store
      .pipe(
        select(CartSelectors.getActiveCartState),
        filter(cartState => !cartState.loading),
        tap(cartState => {
          // If the cart is not created it needs to be created
          // This step should happen before adding entries to avoid conflicts in the requests
          if (!this.isCreated(cartState.value.content)) {
            this.store.dispatch(
              new CartActions.CreateCart({ userId: this.cartData.userId })
            );
          }
        }),
        filter(cartState => this.isCreated(cartState.value.content)),
        take(1)
      )
      .subscribe(() => {
        this.addEntries(cartEntries);
      });
  }
}
