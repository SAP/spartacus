import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, EMPTY, Observable, Subscription, timer } from 'rxjs';
import {
  auditTime,
  debounce,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { UserIdService } from '../../auth/index';
import { Cart } from '../../model/cart.model';
import { User } from '../../model/misc.model';
import { OrderEntry } from '../../model/order.model';
import {
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_GUEST,
} from '../../occ/utils/occ-constants';
import { ProcessesLoaderState } from '../../state/utils/processes-loader/processes-loader-state';
import { EMAIL_PATTERN } from '../../util/regex-pattern';
import { StateWithMultiCart } from '../store/multi-cart-state';
import { MultiCartSelectors } from '../store/selectors/index';
import { getCartIdByUserId, isTempCartId } from '../utils/utils';
import { MultiCartService } from './multi-cart.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveCartService implements OnDestroy {
  private readonly PREVIOUS_USER_ID_INITIAL_VALUE =
    'PREVIOUS_USER_ID_INITIAL_VALUE';
  private previousUserId = this.PREVIOUS_USER_ID_INITIAL_VALUE;
  private activeCart$: Observable<Cart>;
  protected subscription = new Subscription();

  private userId = OCC_USER_ID_ANONYMOUS;
  private cartId;
  private cartUser: User;

  private activeCartId$ = this.store.pipe(
    select(MultiCartSelectors.getActiveCartId),
    filter((cartId) => typeof cartId !== 'undefined'),
    map((cartId) => {
      if (!cartId) {
        return OCC_CART_ID_CURRENT;
      }
      return cartId;
    })
  );
  private cartSelector$ = this.activeCartId$.pipe(
    switchMap((cartId) => this.multiCartService.getCartEntity(cartId))
  );

  constructor(
    protected store: Store<StateWithMultiCart>,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService
  ) {
    this.initActiveCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected initActiveCart() {
    this.subscription.add(
      combineLatest([
        this.userIdService.getUserId(),
        this.activeCartId$.pipe(auditTime(0)),
      ])
        .pipe(map(([userId]) => userId))
        .subscribe((userId) => {
          this.userId = userId;
          if (this.userId !== OCC_USER_ID_ANONYMOUS) {
            if (this.isJustLoggedIn(userId)) {
              this.loadOrMerge(this.cartId);
            }
          }
          this.previousUserId = userId;
        })
    );

    this.subscription.add(
      this.activeCartId$.subscribe((cartId) => {
        this.cartId = cartId;
      })
    );

    this.activeCart$ = this.cartSelector$.pipe(
      withLatestFrom(this.activeCartId$),
      map(([cartEntity, activeCartId]: [ProcessesLoaderState<Cart>, string]): {
        cart: Cart;
        cartId: string;
        isStable: boolean;
        loaded: boolean;
      } => {
        return {
          cart: cartEntity.value,
          cartId: activeCartId,
          isStable: !cartEntity.loading && cartEntity.processesCount === 0,
          loaded:
            (cartEntity.error || cartEntity.success) && !cartEntity.loading,
        };
      }),
      // we want to emit empty carts even if those are not stable
      // on merge cart action we want to switch to empty cart so no one would use old cartId which can be already obsolete
      // so on merge action the resulting stream looks like this: old_cart -> {} -> new_cart
      filter(({ isStable, cart }) => isStable || this.isEmpty(cart)),
      tap(({ cart, cartId, loaded, isStable }) => {
        if (
          isStable &&
          this.isEmpty(cart) &&
          !loaded &&
          !isTempCartId(cartId)
        ) {
          this.load(cartId);
        }
      }),
      map(({ cart }) => (cart ? cart : {})),
      tap((cart) => {
        if (cart) {
          this.cartUser = cart.user;
        }
      }),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Returns active cart
   */
  getActive(): Observable<Cart> {
    return this.activeCart$;
  }

  /**
   * Returns active cart id
   */
  getActiveCartId(): Observable<string> {
    return this.activeCart$.pipe(
      map((cart) => getCartIdByUserId(cart, this.userId)),
      distinctUntilChanged()
    );
  }

  /**
   * Returns cart entries
   */
  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartId$.pipe(
      switchMap((cartId) => this.multiCartService.getEntries(cartId)),
      distinctUntilChanged()
    );
  }

  /**
   * Returns last cart entry for provided product code.
   * Needed to cover processes where multiple entries can share the same product code
   * (e.g. promotions or configurable products)
   *
   * @param productCode
   */
  getLastEntry(productCode: string): Observable<OrderEntry> {
    return this.activeCartId$.pipe(
      switchMap((cartId) =>
        this.multiCartService.getLastEntry(cartId, productCode)
      ),
      distinctUntilChanged()
    );
  }

  /**
   * Returns cart loading state
   */
  getLoading(): Observable<boolean> {
    return this.cartSelector$.pipe(
      map((cartEntity) => cartEntity.loading),
      distinctUntilChanged()
    );
  }

  /**
   * Returns true when cart is stable (not loading and not pending processes on cart)
   */
  isStable(): Observable<boolean> {
    // Debounce is used here, to avoid flickering when we switch between different cart entities.
    // For example during `addEntry` method. We might try to load current cart, so `current cart will be then active id.
    // After load fails we might create new cart so we switch to `temp-${uuid}` cart entity used when creating cart.
    // At the end we finally switch to cart `code` for cart id. Between those switches cart `isStable` function should not flicker.
    return this.activeCartId$.pipe(
      switchMap((cartId) => this.multiCartService.isStable(cartId)),
      debounce((state) => (state ? timer(0) : EMPTY)),
      distinctUntilChanged()
    );
  }

  private loadOrMerge(cartId: string): void {
    // for login user, whenever there's an existing cart, we will load the user
    // current cart and merge it into the existing cart
    if (!cartId || cartId === OCC_CART_ID_CURRENT) {
      this.multiCartService.loadCart({
        userId: this.userId,
        cartId: OCC_CART_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    } else if (this.isGuestCart()) {
      this.guestCartMerge(cartId);
    } else if (
      this.userId !== this.previousUserId &&
      this.userId !== OCC_USER_ID_ANONYMOUS &&
      this.previousUserId !== OCC_USER_ID_ANONYMOUS
    ) {
      // This case covers the case when you are logged in and then asm user logs in and you don't want to merge, but only load emulated user cart
      // Similarly when you are logged in as asm user and you logout and want to resume previous user session
      this.multiCartService.loadCart({
        userId: this.userId,
        cartId,
        extraData: {
          active: true,
        },
      });
    } else {
      this.multiCartService.mergeToCurrentCart({
        userId: this.userId,
        cartId,
        extraData: {
          active: true,
        },
      });
    }
  }

  private load(cartId: string): void {
    if (this.userId !== OCC_USER_ID_ANONYMOUS) {
      this.multiCartService.loadCart({
        userId: this.userId,
        cartId: cartId ? cartId : OCC_CART_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    } else if (cartId && cartId !== OCC_CART_ID_CURRENT) {
      this.multiCartService.loadCart({
        userId: this.userId,
        cartId: cartId,
        extraData: {
          active: true,
        },
      });
    }
  }

  private addEntriesGuestMerge(cartEntries: OrderEntry[]) {
    const entriesToAdd = cartEntries.map((entry) => ({
      productCode: entry.product.code,
      quantity: entry.quantity,
    }));
    this.requireLoadedCartForGuestMerge().subscribe((cartState) => {
      this.multiCartService.addEntries(
        this.userId,
        getCartIdByUserId(cartState.value, this.userId),
        entriesToAdd
      );
    });
  }

  private requireLoadedCartForGuestMerge() {
    return this.requireLoadedCart(
      this.cartSelector$.pipe(filter(() => !this.isGuestCart()))
    );
  }

  private isCartCreating(cartState) {
    // cart creating is always represented with loading flags
    // when all loading flags are false it means that we restored wrong cart id
    // could happen on context change or reload right in the middle on cart create call
    return (
      isTempCartId(this.cartId) &&
      (cartState.loading || cartState.success || cartState.error)
    );
  }

  requireLoadedCart(
    customCartSelector$?: Observable<ProcessesLoaderState<Cart>>
  ): Observable<ProcessesLoaderState<Cart>> {
    // For guest cart merge we want to filter guest cart in the whole stream
    // We have to wait with load/create/addEntry after guest cart will be deleted.
    // That's why you can provide custom selector with this filter applied.
    const cartSelector$ = customCartSelector$
      ? customCartSelector$
      : this.cartSelector$;

    return cartSelector$.pipe(
      filter((cartState) => !cartState.loading),
      // Avoid load/create call when there are new cart creating at the moment
      filter((cartState) => !this.isCartCreating(cartState)),
      take(1),
      switchMap((cartState) => {
        // Try to load the cart, because it might have been created on another device between our login and add entry call
        if (
          this.isEmpty(cartState.value) &&
          this.userId !== OCC_USER_ID_ANONYMOUS
        ) {
          this.load(undefined);
        }
        return cartSelector$;
      }),
      filter((cartState) => !cartState.loading),
      // create cart can happen to anonymous user if it is not empty or to any other user if it is loaded and empty
      filter(
        (cartState) =>
          this.userId === OCC_USER_ID_ANONYMOUS ||
          cartState.success ||
          cartState.error
      ),
      take(1),
      switchMap((cartState) => {
        if (this.isEmpty(cartState.value)) {
          this.multiCartService.createCart({
            userId: this.userId,
            extraData: {
              active: true,
            },
          });
        }
        return cartSelector$;
      }),
      filter((cartState) => !cartState.loading),
      filter((cartState) => cartState.success || cartState.error),
      // wait for active cart id to point to code/guid to avoid some work on temp cart entity
      filter((cartState) => !this.isCartCreating(cartState)),
      filter((cartState) => !this.isEmpty(cartState.value)),
      take(1)
    );
  }

  /**
   * Add entry to active cart
   *
   * @param productCode
   * @param quantity
   */
  addEntry(productCode: string, quantity: number): void {
    this.requireLoadedCart().subscribe((cartState) => {
      this.multiCartService.addEntry(
        this.userId,
        getCartIdByUserId(cartState.value, this.userId),
        productCode,
        quantity
      );
    });
  }

  /**
   * Remove entry
   *
   * @param entry
   */
  removeEntry(entry: OrderEntry): void {
    this.multiCartService.removeEntry(
      this.userId,
      this.cartId,
      entry.entryNumber
    );
  }

  /**
   * Update entry
   *
   * @param entryNumber
   * @param quantity
   */
  updateEntry(entryNumber: number, quantity: number): void {
    this.multiCartService.updateEntry(
      this.userId,
      this.cartId,
      entryNumber,
      quantity
    );
  }

  /**
   * Returns cart entry
   *
   * @param productCode
   */
  getEntry(productCode: string): Observable<OrderEntry> {
    return this.activeCartId$.pipe(
      switchMap((cartId) =>
        this.multiCartService.getEntry(cartId, productCode)
      ),
      distinctUntilChanged()
    );
  }

  /**
   * Assign email to cart
   *
   * @param email
   */
  addEmail(email: string): void {
    this.multiCartService.assignEmail(this.cartId, this.userId, email);
  }

  /**
   * Get assigned user to cart
   */
  getAssignedUser(): Observable<User> {
    return this.getActive().pipe(map((cart) => cart.user));
  }

  /**
   * Returns true for guest cart
   */
  isGuestCart(): boolean {
    return (
      this.cartUser &&
      (this.cartUser.name === OCC_USER_ID_GUEST ||
        this.isEmail(this.cartUser.uid.split('|').slice(1).join('|')))
    );
  }

  /**
   * Add multiple entries to a cart
   *
   * @param cartEntries : list of entries to add (OrderEntry[])
   */
  addEntries(cartEntries: OrderEntry[]): void {
    cartEntries.forEach((entry) => {
      this.addEntry(entry.product.code, entry.quantity);
    });
  }

  private isEmail(str: string): boolean {
    if (str) {
      return str.match(EMAIL_PATTERN) ? true : false;
    }
    return false;
  }

  // TODO: Remove once backend is updated
  /**
   * Temporary method to merge guest cart with user cart because of backend limitation
   * This is for an edge case
   */
  private guestCartMerge(cartId: string): void {
    let cartEntries: OrderEntry[];
    this.getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        cartEntries = entries;
        this.multiCartService.deleteCart(cartId, OCC_USER_ID_ANONYMOUS);
        this.addEntriesGuestMerge(cartEntries);
      });
  }

  private isEmpty(cart: Cart): boolean {
    return (
      !cart || (typeof cart === 'object' && Object.keys(cart).length === 0)
    );
  }

  private isJustLoggedIn(userId: string): boolean {
    return (
      this.previousUserId !== userId && // *just* logged in
      this.previousUserId !== this.PREVIOUS_USER_ID_INITIAL_VALUE // not app initialization
    );
  }
}
