/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade, CreateCartEvent } from '@spartacus/cart/base/root';
import {
  AuthService,
  BASE_SITE_CONTEXT_ID,
  EventService,
  FeatureConfigService,
  SiteContextParamsService,
  StatePersistenceService,
  StorageSyncType,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeWhile,
} from 'rxjs/operators';

/**
 * Debounce window applied to the mini-cart "updating" indicator. Short bursts
 * of cart activity on a fast network can flip `isStable()` false→true→false in
 * a few hundred ms; without a debounce the indicator strobes. 250ms is long
 * enough to swallow that flicker and short enough that a slow-network user
 * still sees feedback well within their reaction window.
 */
const MINI_CART_UPDATING_DEBOUNCE_MS = 250;

@Injectable({
  providedIn: 'root',
})
export class MiniCartComponentService {
  protected featureConfigService = inject(FeatureConfigService);

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected authService: AuthService,
    protected statePersistenceService: StatePersistenceService,
    protected siteContextParamsService: SiteContextParamsService,
    protected eventService: EventService
  ) {}

  /**
   * This function supports lazy loading of the cart functionality's code. We only call
   * the activeCartFacade if we know there is actually a cart.
   * Without a cart, we can return a default value and
   * avoid loading the cart library code.
   */
  getQuantity(): Observable<number> {
    return this.activeCartRequired().pipe(
      switchMap((activeCartRequired) => {
        if (activeCartRequired) {
          return this.activeCartFacade.getActive().pipe(
            startWith({ totalUnitCount: 0 }),
            map((cart) => cart.totalUnitCount || 0)
          );
        } else {
          return of(0);
        }
      })
    );
  }

  /**
   * This function supports lazy loading of the cart functionality's code. We only call
   * the activeCartFacade if we know there is actually a cart.
   * Without a cart, we can return a default value and
   * avoid loading the cart library code.
   */
  getTotalPrice(): Observable<string> {
    return this.activeCartRequired().pipe(
      switchMap((activeCartRequired) => {
        if (activeCartRequired) {
          return this.activeCartFacade
            .getActive()
            .pipe(map((cart) => cart.totalPrice?.formattedValue ?? ''));
        } else {
          return of('');
        }
      })
    );
  }

  /**
   * Emits true while the active cart has pending writes (an entry POST is in
   * flight, processesCount > 0, or the cart entity is loading). Drives the
   * mini-cart's loading affordance so users get feedback that their click
   * registered, without waiting for the round-trip GET reconcile.
   *
   * Lazy in the same way as getQuantity/getTotalPrice: when no active cart is
   * required (anonymous, no cart in storage, no CreateCart event) we don't
   * touch ActiveCartFacade — keeps the cart code chunk out of the initial
   * load.
   *
   * Gated by `enableCartSlowNetworkResilience`; emits constant `false` when
   * the toggle is OFF so an extending client sees pre-CXSPA-10582 behaviour
   * (no indicator).
   */
  getUpdating(): Observable<boolean> {
    if (
      !this.featureConfigService.isEnabled('enableCartSlowNetworkResilience')
    ) {
      return of(false);
    }
    return this.activeCartRequired().pipe(
      switchMap((activeCartRequired) => {
        if (!activeCartRequired) {
          return of(false);
        }
        return this.activeCartFacade.isStable().pipe(
          map((stable) => !stable),
          debounceTime(MINI_CART_UPDATING_DEBOUNCE_MS),
          startWith(false),
          distinctUntilChanged()
        );
      })
    );
  }

  /**
   * This function determines if it is required to get active cart data from ActiveCartFacade.
   * It is required to call the ActiveCartFacade if one of these criteria is met:
   * - There is an active cart id in the browser local storage
   * - A user is authenticated
   * - The cart library code chunk with the ActiveCartFacade implementation is already loaded.
   *
   * Once the observable returned by activeCartRequired emits true, it completes.
   * activeCartRequired helps to make the mini cart compatible with some level of lazy loading.
   */
  protected activeCartRequired(): Observable<boolean> {
    return combineLatest([
      this.hasActiveCartInStorage(),
      this.authService.isUserLoggedIn(),
      this.isCartCreated(),
    ]).pipe(
      map(
        ([hasCartInStorage, isUserLoggedIn, isCartCreated]) =>
          hasCartInStorage || isUserLoggedIn || isCartCreated
      ),
      distinctUntilChanged(),
      takeWhile((hasCart) => !hasCart, true)
    );
  }

  protected hasActiveCartInStorage(): Observable<boolean> {
    return this.getCartStateFromBrowserStorage().pipe(
      map((state) => Boolean(state?.active))
    );
  }

  protected isCartCreated(): Observable<boolean> {
    return this.eventService.get(CreateCartEvent).pipe(
      map((_) => true),
      startWith(false)
    );
  }

  protected getCartStateFromBrowserStorage(): Observable<
    { active: string } | undefined
  > {
    return this.siteContextParamsService.getValues([BASE_SITE_CONTEXT_ID]).pipe(
      map((context) => {
        return this.statePersistenceService.readStateFromStorage({
          key: 'cart',
          context: context,
          storageType: StorageSyncType.LOCAL_STORAGE,
        });
      })
    );
  }
}
