import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  combineLatest,
  EMPTY,
  Observable,
  of,
  Subscription,
  timer,
  using,
} from 'rxjs';
import {
  debounce,
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  shareReplay,
  switchMap,
  switchMapTo,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Cart, EntryGroup } from '../../model/cart.model';
import { UserIdService } from '../../auth/index';
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
import { activeCartInitialState } from '../store/reducers/multi-cart.reducer';
import { MultiCartSelectors } from '../store/selectors/index';
import { getCartIdByUserId, isTempCartId } from '../utils/utils';
import { MultiCartService } from './multi-cart.service';
import { BundleService } from '../bundle/core/facade/bundle.service';
import { BundleStarter } from '../bundle/core/model/bundle.model';

@Injectable({
  providedIn: 'root',
})
export class ActiveCartService implements OnDestroy {
  private activeCart$: Observable<Cart>;
  protected subscription = new Subscription();

  // This stream is used for referencing carts in API calls.
  private activeCartId$ = this.userIdService.getUserId().pipe(
    // We want to wait with initialization of cartId until we have userId initialized
    // We have take(1) to not trigger this stream, when userId changes.
    take(1),
    switchMapTo(this.store),
    select(MultiCartSelectors.getActiveCartId),
    // We also wait until we initialize cart from localStorage. Before that happens cartId in store === null
    filter((cartId) => cartId !== activeCartInitialState),
    map((cartId) => {
      if (cartId === '') {
        // We fallback to current when we don't have particular cart id -> cartId === '', because that's how you reference latest user cart.
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
    protected multiCartService: MultiCartService,
    protected userIdService: UserIdService,
    protected bundleService: BundleService
  ) {
    this.initActiveCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected initActiveCart() {
    // Any change of user id is also interesting for us, because we have to merge/load/switch cart in those cases.
    this.subscription.add(
      this.userIdService
        .getUserId()
        .pipe(
          // We never trigger cart merge/load on app initialization here and that's why we wait with pairwise for a change of userId (not initialization).
          pairwise(),
          switchMap(([previousUserId, userId]) =>
            // We need cartId once we have the previous and current userId. We don't want to subscribe to cartId stream before.
            combineLatest([
              of(previousUserId),
              of(userId),
              this.activeCartId$,
            ]).pipe(take(1))
          )
        )
        .subscribe(([previousUserId, userId, cartId]) => {
          // Only change of user and not a logout (current user id !== anonymous) should trigger loading mechanism
          if (this.isJustLoggedIn(userId, previousUserId)) {
            this.loadOrMerge(cartId, userId, previousUserId);
          }
        })
    );

    // Stream for getting the cart value
    const activeCartValue$ = this.cartSelector$.pipe(
      map((cartEntity: ProcessesLoaderState<Cart>): {
        cart: Cart;
        isStable: boolean;
        loaded: boolean;
      } => {
        return {
          cart: cartEntity.value,
          isStable: !cartEntity.loading && cartEntity.processesCount === 0,
          loaded:
            (cartEntity.error || cartEntity.success) && !cartEntity.loading,
        };
      }),
      // we want to emit empty carts even if those are not stable
      // on merge cart action we want to switch to empty cart so no one would use old cartId which can be already obsolete
      // so on merge action the resulting stream looks like this: old_cart -> {} -> new_cart
      filter(({ isStable, cart }) => isStable || this.isEmpty(cart))
    );

    // Responsible for loading cart when it's not (eg. app initialization when we have only cart id)
    const activeCartLoading$ = activeCartValue$.pipe(
      withLatestFrom(this.activeCartId$, this.userIdService.getUserId()),
      tap(([{ cart, loaded, isStable }, cartId, userId]) => {
        if (
          isStable &&
          this.isEmpty(cart) &&
          !loaded &&
          !isTempCartId(cartId)
        ) {
          this.load(cartId, userId);
        }
      })
    );

    this.activeCart$ = using(
      () => activeCartLoading$.subscribe(),
      () => activeCartValue$
    ).pipe(
      // Normalization for empty cart value. It will always be returned as empty object.
      map(({ cart }) => (cart ? cart : {})),
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
      withLatestFrom(this.userIdService.getUserId()),
      map(([cart, userId]) => getCartIdByUserId(cart, userId)),
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
   * Returns cart entries
   */
  getEntryGroups(): Observable<EntryGroup[]> {
    return this.activeCartId$.pipe(
      switchMap((cartId) => this.multiCartService.getEntryGroups(cartId)),
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

  private loadOrMerge(
    cartId: string,
    userId: string,
    previousUserId: string
  ): void {
    // for login user, whenever there's an existing cart, we will load the user
    // current cart and merge it into the existing cart
    // cartId will be defined (not '', null, undefined)
    if (cartId === OCC_CART_ID_CURRENT) {
      this.multiCartService.loadCart({
        userId,
        cartId: OCC_CART_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    } else if (this.isGuestCart()) {
      this.guestCartMerge(cartId);
    } else if (
      userId !== previousUserId &&
      userId !== OCC_USER_ID_ANONYMOUS &&
      previousUserId !== OCC_USER_ID_ANONYMOUS
    ) {
      // This case covers the case when you are logged in and then asm user logs in and you don't want to merge, but only load emulated user cart
      // Similarly when you are logged in as asm user and you logout and want to resume previous user session
      this.multiCartService.loadCart({
        userId,
        cartId,
        extraData: {
          active: true,
        },
      });
    } else {
      // We have particular cart locally, but we logged in, so we need to combine this with current cart or make it ours.
      this.multiCartService.mergeToCurrentCart({
        userId,
        cartId,
        extraData: {
          active: true,
        },
      });
    }
  }

  private load(cartId: string, userId: string): void {
    // We want to load cart in every case apart from anonymous user and current cart combination
    if (!(userId === OCC_USER_ID_ANONYMOUS && cartId === OCC_CART_ID_CURRENT)) {
      this.multiCartService.loadCart({
        userId,
        cartId,
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
    this.requireLoadedCartForGuestMerge()
      .pipe(withLatestFrom(this.userIdService.getUserId()))
      .subscribe(([cartState, userId]) => {
        this.multiCartService.addEntries(
          userId,
          getCartIdByUserId(cartState.value, userId),
          entriesToAdd
        );
      });
  }

  private requireLoadedCartForGuestMerge() {
    return this.requireLoadedCart(
      this.cartSelector$.pipe(filter(() => !this.isGuestCart()))
    );
  }

  private isCartCreating(
    cartState: ProcessesLoaderState<Cart>,
    cartId: string
  ) {
    // cart creating is always represented with loading flags
    // when all loading flags are false it means that we restored wrong cart id
    // could happen on context change or reload right in the middle on cart create call
    return (
      isTempCartId(cartId) &&
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
      withLatestFrom(this.activeCartId$),
      filter(([cartState, cartId]) => !this.isCartCreating(cartState, cartId)),
      map(([cartState]) => cartState),
      take(1),
      withLatestFrom(this.userIdService.getUserId()),
      tap(([cartState, userId]) => {
        // Try to load the cart, because it might have been created on another device between our login and add entry call
        if (this.isEmpty(cartState.value) && userId !== OCC_USER_ID_ANONYMOUS) {
          this.load(OCC_CART_ID_CURRENT, userId);
        }
      }),
      switchMap(() => {
        return cartSelector$;
      }),
      filter((cartState) => !cartState.loading),
      // create cart can happen to anonymous user if it is not empty or to any other user if it is loaded and empty
      withLatestFrom(this.userIdService.getUserId()),
      filter(
        ([cartState, userId]) =>
          userId === OCC_USER_ID_ANONYMOUS ||
          cartState.success ||
          cartState.error
      ),
      take(1),
      tap(([cartState, userId]) => {
        if (this.isEmpty(cartState.value)) {
          this.multiCartService.createCart({
            userId,
            extraData: {
              active: true,
            },
          });
        }
      }),
      switchMap(() => {
        return cartSelector$;
      }),
      filter((cartState) => !cartState.loading),
      filter((cartState) => cartState.success || cartState.error),
      // wait for active cart id to point to code/guid to avoid some work on temp cart entity
      withLatestFrom(this.activeCartId$),
      filter(([cartState, cartId]) => !this.isCartCreating(cartState, cartId)),
      map(([cartState]) => cartState),
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
    this.requireLoadedCart()
      .pipe(withLatestFrom(this.userIdService.getUserId()))
      .subscribe(([cartState, userId]) => {
        this.multiCartService.addEntry(
          userId,
          getCartIdByUserId(cartState.value, userId),
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
    this.activeCartId$
      .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
      .subscribe(([cartId, userId]) => {
        this.multiCartService.removeEntry(userId, cartId, entry.entryNumber);
      });
  }

  /**
   * Update entry
   *
   * @param entryNumber
   * @param quantity
   */
  updateEntry(entryNumber: number, quantity: number): void {
    this.activeCartId$
      .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
      .subscribe(([cartId, userId]) => {
        this.multiCartService.updateEntry(
          userId,
          cartId,
          entryNumber,
          quantity
        );
      });
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
    this.activeCartId$
      .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
      .subscribe(([cartId, userId]) => {
        this.multiCartService.assignEmail(cartId, userId, email);
      });
  }

  /**
   * Get assigned user to cart
   */
  getAssignedUser(): Observable<User> {
    return this.getActive().pipe(map((cart) => cart.user));
  }

  // TODO: Make cart required param in 4.0 and drop the subscribe/unsubscribe.
  /**
   * Returns true for guest cart
   */
  isGuestCart(cart?: Cart): boolean {
    if (!cart) {
      this.activeCart$
        .subscribe((activeCart) => (cart = activeCart))
        .unsubscribe();
    }
    const cartUser = cart?.user;
    return (
      cartUser &&
      (cartUser.name === OCC_USER_ID_GUEST ||
        this.isEmail(cartUser.uid.split('|').slice(1).join('|')))
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

  private isJustLoggedIn(userId: string, previousUserId: string): boolean {
    return (
      userId !== OCC_USER_ID_ANONYMOUS && // not logged out
      previousUserId !== userId // *just* logged in / switched to ASM emulation
    );
  }

  /**
   * Remove bundle
   *
   * @param entryGroupNumber
   */
  deleteEntryGroup(entryGroupNumber: number) {
    this.requireLoadedCart().subscribe((cartState) => {
      this.userIdService.takeUserId().subscribe((userId) => {
        this.multiCartService.deleteEntryGroup(
          getCartIdByUserId(cartState.value, userId),
          userId,
          entryGroupNumber
        );
      });
    });
  }

  /**
   * Add Product to bundle
   *
   * @param entryGroupNumber
   * @param entry
   */
  addToEntryGroup(entryGroupNumber: number, entry: OrderEntry) {
    this.requireLoadedCart().subscribe((cartState) => {
      this.userIdService.takeUserId().subscribe((userId) => {
        this.multiCartService.addToEntryGroup(
          getCartIdByUserId(cartState.value, userId),
          userId,
          entryGroupNumber,
          entry
        );
      });
    });
  }

  /**
   * Start bundle
   *
   * @param productCode
   * @param quantity
   * @param templateId
   */
  startBundle(starter: BundleStarter) {
    this.requireLoadedCart().subscribe((cartState) => {
      this.userIdService.takeUserId().subscribe((userId) => {
        this.bundleService?.startBundle(
          getCartIdByUserId(cartState.value, userId),
          userId,
          starter
        );
      });
    });
  }

  /**
   * Get allowed Bundle Products
   *
   * @param entryGroupNumber
   */
  getBundleAllowedProducts(entryGroupNumber: number) {
    this.requireLoadedCart().subscribe((cartState) => {
      this.userIdService.takeUserId().subscribe((userId) => {
        this.bundleService?.getBundleAllowedProducts(
          getCartIdByUserId(cartState.value, userId),
          userId,
          entryGroupNumber
        );
      });
    });
  }

  /**
   * Get allowed Bundle Products
   *
   * @param entryGroupNumber
   */
  getAvailableEntries(entryGroupNumber: number) {
    let cartId

    combineLatest([
      this.requireLoadedCart(),
      this.userIdService.takeUserId(),
    ]).pipe(
      take(1),
    ).subscribe(([cartState, userId]) => {
      cartId = getCartIdByUserId(cartState.value, userId)
    });

    return this.bundleService.getAvailableEntriesEntity(
      cartId,
      entryGroupNumber
    );
  }
}
