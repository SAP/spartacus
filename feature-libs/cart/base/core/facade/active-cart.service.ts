/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  CartType,
  MultiCartFacade,
  OrderEntry,
} from '@spartacus/cart/base/root';
import {
  getLastValueSync,
  OAUTH_REDIRECT_FLOW_KEY,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_GUEST,
  StateUtils,
  User,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, Observable, of, Subscription, using } from 'rxjs';
import {
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
import {
  getCartIdByUserId,
  isEmail,
  isEmpty,
  isJustLoggedIn,
  isTempCartId,
} from '../utils/utils';

@Injectable()
export class ActiveCartService implements ActiveCartFacade, OnDestroy {
  protected activeCart$: Observable<Cart>;
  protected subscription = new Subscription();

  // This stream is used for referencing carts in API calls.
  protected activeCartId$ = this.userIdService.getUserId().pipe(
    // We want to wait the initialization of cartId until the userId is initialized
    // We have take(1) to not trigger this stream, when userId changes.
    take(1),
    switchMapTo(this.multiCartFacade.getCartIdByType(CartType.ACTIVE)),
    // We also wait until we initialize cart from localStorage
    filter((cartId) => cartId !== undefined),
    // fallback to current when we don't have particular cart id
    map((cartId) => (cartId === '' ? OCC_CART_ID_CURRENT : cartId))
  );

  // Stream with active cart entity
  protected cartEntity$ = this.activeCartId$.pipe(
    switchMap((cartId) => this.multiCartFacade.getCartEntity(cartId))
  );

  // Flag to prevent cart loading when logged in with code flow
  // Instead of loading cart will run loadOrMerge method
  protected shouldLoadCartOnCodeFlow = true;

  constructor(
    protected multiCartFacade: MultiCartFacade,
    protected userIdService: UserIdService,
    /**
     * TODO: (From 7.0) This dependency should be required from the next major.
     * It is used to fix a problem related to merge carts in oAuth redirect flow.
     *
     * For more context please see: CXSPA-617.
     */
    protected winRef?: WindowRef
  ) {
    this.initActiveCart();
    this.detectUserChange();
  }

  protected initActiveCart() {
    // Stream for getting the cart value
    const cartValue$ = this.cartEntity$.pipe(
      map((cartEntity) => {
        return {
          cart: cartEntity.value,
          isStable: !cartEntity.loading && cartEntity.processesCount === 0,
          loaded: Boolean(
            (cartEntity.error || cartEntity.success) && !cartEntity.loading
          ),
        };
      }),
      // we want to emit empty carts even if those are not stable
      // on merge cart action we want to switch to empty cart so no one would use old cartId which can be already obsolete
      // so on merge action the resulting stream looks like this: old_cart -> {} -> new_cart
      filter(({ isStable, cart }) => isStable || isEmpty(cart))
    );

    // Responsible for loading cart when it does not exist (eg. app initialization when we have only cartId)
    const loading = cartValue$.pipe(
      withLatestFrom(this.activeCartId$, this.userIdService.getUserId()),
      tap(([{ cart, loaded, isStable }, cartId, userId]) => {
        if (
          isStable &&
          isEmpty(cart) &&
          !loaded &&
          !isTempCartId(cartId) &&
          this.shouldLoadCartOnCodeFlow
        ) {
          this.load(cartId, userId);
        }
      })
    );

    this.activeCart$ = using(
      () => loading.subscribe(),
      () => cartValue$
    ).pipe(
      // Normalization for empty cart value returned as empty object.
      map(({ cart }) => (cart ? cart : {})),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  protected detectUserChange() {
    // Any changes of userId is interesting for us, because we have to merge/load/switch cart in those cases.
    this.subscription.add(
      this.userIdService
        .getUserId()
        .pipe(
          // We never trigger cart merge/load on app initialization here and that's why we wait with pairwise for a change of userId.
          pairwise(),
          // We need cartId once we have the previous and current userId. We don't want to subscribe to cartId stream before.
          withLatestFrom(this.activeCartId$)
        )
        .subscribe(([[previousUserId, userId], cartId]) => {
          // Only change of user and not logout (current userId !== anonymous) should trigger loading mechanism
          if (isJustLoggedIn(userId, previousUserId)) {
            this.loadOrMerge(cartId, userId, previousUserId);
          }
        })
    );

    // Detect user logged in with code flow.
    if (this.isLoggedInWithCodeFlow()) {
      // Prevent loading cart while merging.
      this.shouldLoadCartOnCodeFlow = false;

      this.subscription.add(
        this.userIdService
          .getUserId()
          .pipe(withLatestFrom(this.activeCartId$))
          .subscribe(([userId, cartId]) => {
            this.loadOrMerge(cartId, userId, OCC_USER_ID_ANONYMOUS);
            this.winRef?.localStorage?.removeItem(OAUTH_REDIRECT_FLOW_KEY);
          })
      );
    }
  }

  /**
   * Returns active cart
   */
  getActive(): Observable<Cart> {
    return this.activeCart$;
  }

  /**
   * Waits for the cart to be stable before returning the active cart.
   */
  takeActive(): Observable<Cart> {
    return this.isStable().pipe(
      filter((isStable) => isStable),
      switchMap(() => this.getActive()),
      filter((cart) => !!cart),
      take(1)
    );
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
   * Waits for the cart to be stable before returning the active cart's ID.
   */
  takeActiveCartId(): Observable<string> {
    return this.isStable().pipe(
      filter((isStable) => isStable),
      switchMap(() => this.getActiveCartId()),
      filter((cartId) => !!cartId),
      take(1)
    );
  }

  /**
   * Returns cart entries
   */
  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartId$.pipe(
      switchMap((cartId) => this.multiCartFacade.getEntries(cartId)),
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
  getLastEntry(productCode: string): Observable<OrderEntry | undefined> {
    return this.activeCartId$.pipe(
      switchMap((cartId) =>
        this.multiCartFacade.getLastEntry(cartId, productCode)
      ),
      distinctUntilChanged()
    );
  }

  /**
   * Returns cart loading state
   */
  getLoading(): Observable<boolean> {
    return this.cartEntity$.pipe(
      map((cartEntity) => Boolean(cartEntity.loading)),
      distinctUntilChanged()
    );
  }

  /**
   * Returns true when cart is stable (not loading and not pending processes on cart)
   */
  isStable(): Observable<boolean> {
    return this.activeCartId$.pipe(
      switchMap((cartId) => this.multiCartFacade.isStable(cartId))
    );
  }

  /**
   * Loads cart in every case except anonymous user and current cart combination
   */
  protected load(cartId: string, userId: string): void {
    if (!(userId === OCC_USER_ID_ANONYMOUS && cartId === OCC_CART_ID_CURRENT)) {
      this.multiCartFacade.loadCart({
        userId,
        cartId,
        extraData: {
          active: true,
        },
      });
    }
  }

  /**
   * Loads cart upon login, whenever there's an existing cart, merge it into the current user cart
   * cartId will be defined (not '', null, undefined)
   */
  protected loadOrMerge(
    cartId: string,
    userId: string,
    previousUserId: string
  ): void {
    if (
      cartId === OCC_CART_ID_CURRENT ||
      // It covers the case when you are logged in and then asm user login, you don't want to merge, but only load emulated user cart
      // Similarly when you are logged in as asm user and you logout and want to resume previous user session
      previousUserId !== OCC_USER_ID_ANONYMOUS
    ) {
      this.multiCartFacade.loadCart({
        userId,
        cartId,
        extraData: {
          active: true,
        },
      });
    } else if (Boolean(getLastValueSync(this.isGuestCart()))) {
      this.guestCartMerge(cartId);
    } else {
      // We have particular cart locally, but we logged in, so we need to combine this with current cart or make it ours.
      this.multiCartFacade.mergeToCurrentCart({
        userId,
        cartId,
        extraData: {
          active: true,
        },
      });
    }
  }

  // TODO: Remove once backend is updated
  /**
   * Temporary method to merge guest cart with user cart because of backend limitation
   * This is for an edge case
   */
  protected guestCartMerge(cartId: string): void {
    this.getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        this.multiCartFacade.deleteCart(cartId, OCC_USER_ID_ANONYMOUS);
        this.addEntriesGuestMerge(entries);
      });
  }

  /**
   * Adds entries from guest cart to user cart
   */
  protected addEntriesGuestMerge(cartEntries: OrderEntry[]) {
    const entriesToAdd = cartEntries.map((entry) => ({
      productCode: entry.product?.code ?? '',
      quantity: entry.quantity ?? 0,
    }));
    this.requireLoadedCart(true)
      .pipe(withLatestFrom(this.userIdService.getUserId()))
      .subscribe(([cart, userId]) => {
        this.multiCartFacade.addEntries(
          userId,
          getCartIdByUserId(cart, userId),
          entriesToAdd
        );
      });
  }

  protected isCartCreating(
    cartState: StateUtils.ProcessesLoaderState<Cart | undefined>,
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

  /**
   * Check if user is just logged in with code flow
   */
  protected isLoggedInWithCodeFlow() {
    return !!this.winRef?.localStorage?.getItem(OAUTH_REDIRECT_FLOW_KEY);
  }

  // When the function `requireLoadedCart` is first called, the init cart loading for login user may not be done
  private checkInitLoad: boolean | undefined = undefined;

  requireLoadedCart(forGuestMerge = false): Observable<Cart> {
    this.checkInitLoad = this.checkInitLoad === undefined;

    // For guest cart merge we want to filter guest cart in the whole stream
    // We have to wait with load/create/addEntry after guest cart will be deleted.
    const cartSelector$ = (
      forGuestMerge
        ? this.cartEntity$.pipe(
            filter(() => !Boolean(getLastValueSync(this.isGuestCart())))
          )
        : this.cartEntity$
    ).pipe(filter((cartState) => !cartState.loading || !!this.checkInitLoad));

    return this.activeCartId$.pipe(
      // Avoid load/create call when there are new cart creating at the moment
      withLatestFrom(cartSelector$),
      filter(([cartId, cartState]) => !this.isCartCreating(cartState, cartId)),
      map(([, cartState]) => cartState),
      take(1),
      withLatestFrom(this.userIdService.getUserId()),
      tap(([cartState, userId]) => {
        // Try to load the cart, because it might have been created on another device between our login and add entry call
        if (
          isEmpty(cartState.value) &&
          userId !== OCC_USER_ID_ANONYMOUS &&
          !cartState.loading
        ) {
          this.load(OCC_CART_ID_CURRENT, userId);
        }
        this.checkInitLoad = false;
      }),
      switchMapTo(cartSelector$),
      // create cart can happen to anonymous user if it is empty or to any other user if it is loaded and empty
      withLatestFrom(this.userIdService.getUserId()),
      filter(([cartState, userId]) =>
        Boolean(
          userId === OCC_USER_ID_ANONYMOUS ||
            cartState.success ||
            cartState.error
        )
      ),
      take(1),
      tap(([cartState, userId]) => {
        if (isEmpty(cartState.value)) {
          this.multiCartFacade.createCart({
            userId,
            extraData: {
              active: true,
            },
          });
        }
      }),
      switchMapTo(cartSelector$),
      filter((cartState) => cartState.success || cartState.error),
      // wait for active cart id to point to code/guid to avoid some work on temp cart entity
      withLatestFrom(this.activeCartId$),
      filter(([cartState, cartId]) => !this.isCartCreating(cartState, cartId)),
      map(([cartState]) => cartState.value),
      filter((cart) => !isEmpty(cart)),
      take(1)
    );
  }

  /**
   * Add entry to active cart
   *
   * @param productCode
   * @param quantity
   * @param pickupStore
   */
  addEntry(productCode: string, quantity: number, pickupStore?: string): void {
    this.requireLoadedCart()
      .pipe(withLatestFrom(this.userIdService.getUserId()))
      .subscribe(([cart, userId]) => {
        this.multiCartFacade.addEntry(
          userId,
          getCartIdByUserId(cart, userId),
          productCode,
          quantity,
          pickupStore
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
        this.multiCartFacade.removeEntry(
          userId,
          cartId,
          entry.entryNumber as number
        );
      });
  }

  /**
   * Update entry
   *
   * @param entryNumber
   * @param quantity
   * @param pickupStore
   * @param pickupToDelivery
   */
  updateEntry(
    entryNumber: number,
    quantity?: number,
    pickupStore?: string,
    pickupToDelivery: boolean = false
  ): void {
    this.activeCartId$
      .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
      .subscribe(([cartId, userId]) => {
        this.multiCartFacade.updateEntry(
          userId,
          cartId,
          entryNumber,
          quantity,
          pickupStore,
          pickupToDelivery
        );
      });
  }

  /**
   * Returns cart entry
   *
   * @param productCode
   */
  getEntry(productCode: string): Observable<OrderEntry | undefined> {
    return this.activeCartId$.pipe(
      switchMap((cartId) => this.multiCartFacade.getEntry(cartId, productCode)),
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
        this.multiCartFacade.assignEmail(cartId, userId, email);
      });
  }

  /**
   * Get assigned user to cart
   */
  getAssignedUser(): Observable<User> {
    return this.activeCart$.pipe(map((cart) => cart.user as User));
  }

  // TODO: Make cart required param in 4.0
  /**
   * Returns observable of true for guest cart
   */
  isGuestCart(cart?: Cart): Observable<boolean> {
    return cart
      ? of(this.isCartUserGuest(cart))
      : this.activeCart$.pipe(
          map((activeCart) => this.isCartUserGuest(activeCart)),
          distinctUntilChanged()
        );
  }

  protected isCartUserGuest(cart: Cart): boolean {
    const cartUser = cart.user;
    return Boolean(
      cartUser &&
        (cartUser.name === OCC_USER_ID_GUEST ||
          isEmail(cartUser.uid?.split('|').slice(1).join('|')))
    );
  }

  /**
   * Add multiple entries to a cart
   *
   * @param cartEntries : list of entries to add (OrderEntry[])
   */
  addEntries(cartEntries: OrderEntry[]): void {
    const entriesToAdd = cartEntries.map((entry) => ({
      productCode: entry.product?.code ?? '',
      quantity: entry.quantity ?? 0,
    }));
    this.requireLoadedCart()
      .pipe(withLatestFrom(this.userIdService.getUserId()))
      .subscribe(([cart, userId]) => {
        if (cart) {
          this.multiCartFacade.addEntries(
            userId,
            getCartIdByUserId(cart, userId),
            entriesToAdd
          );
        }
      });
  }

  /**
   * Reloads active cart
   */
  reloadActiveCart() {
    combineLatest([this.getActiveCartId(), this.userIdService.takeUserId()])
      .pipe(
        take(1),
        map(([cartId, userId]) => {
          this.multiCartFacade.loadCart({
            cartId,
            userId,
            extraData: { active: true },
          });
        })
      )
      .subscribe();
  }

  hasPickupItems(): Observable<boolean> {
    return this.getActive().pipe(
      map((cart) =>
        cart.pickupItemsQuantity ? cart.pickupItemsQuantity > 0 : false
      )
    );
  }

  hasDeliveryItems(): Observable<boolean> {
    return this.getActive().pipe(
      map((cart) =>
        cart.deliveryItemsQuantity ? cart.deliveryItemsQuantity > 0 : false
      )
    );
  }

  getPickupEntries(): Observable<OrderEntry[]> {
    return this.getEntries().pipe(
      map((entries) =>
        entries.filter((entry) => entry.deliveryPointOfService !== undefined)
      )
    );
  }

  getDeliveryEntries(): Observable<OrderEntry[]> {
    return this.getEntries().pipe(
      map((entries) =>
        entries.filter((entry) => entry.deliveryPointOfService === undefined)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
