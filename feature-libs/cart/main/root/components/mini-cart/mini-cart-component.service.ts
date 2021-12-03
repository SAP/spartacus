import { Injectable } from '@angular/core';
import {
  AuthService,
  BASE_SITE_CONTEXT_ID,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeWhile,
} from 'rxjs/operators';
import { CartConfig } from '../../config/cart-config';
import { ActiveCartBrowserStorageChangeEvent } from '../../events/cart.events';
import { ActiveCartFacade } from '../../facade/active-cart.facade';

@Injectable({
  providedIn: 'root',
})
export class MiniCartComponentService {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected authService: AuthService,
    protected config: CartConfig,
    protected eventService: EventService,
    protected statePersistenceService: StatePersistenceService,
    protected siteContextParamsService: SiteContextParamsService
  ) {}

  getQuantity(): Observable<number> {
    // This function supports lazy loading of the cart code. We only call
    // the activeCartFacade if we know there is actually a cart by reading
    // the browser storage for an active cart.

    // Without a cart, we can return a default value and
    // avoid loading the cart library code.
    return combineLatest([
      this.browserHasCartInStorage(),
      this.authService.isUserLoggedIn(),
    ]).pipe(
      switchMap(([hasCart, isUserLoggedIn]) => {
        if (hasCart || isUserLoggedIn) {
          return this.activeCartFacade.getActive().pipe(
            startWith({ deliveryItemsQuantity: 0 }),
            map((cart) => cart.deliveryItemsQuantity || 0)
          );
        } else {
          return of(0);
        }
      })
    );
  }

  getTotalPrice(): Observable<string> {
    // This function supports lazy loading of the cart code. We only call
    // the activeCartFacade if we know there is actually a cart by reading
    // the browser storage for an active cart.

    // Without a cart, we can return a default value and
    // avoid loading the cart library code.

    return combineLatest([
      this.browserHasCartInStorage(),
      this.authService.isUserLoggedIn(),
    ]).pipe(
      switchMap(([hasCart, isUserLoggedIn]) => {
        if (hasCart || isUserLoggedIn) {
          return this.activeCartFacade.getActive().pipe(
            filter((cart) => !!cart.totalPrice),
            map((cart) => cart.totalPrice?.formattedValue ?? '')
          );
        } else {
          return of('');
        }
      })
    );
  }

  browserHasCartInStorage(): Observable<boolean> {
    return this.eventService.get(ActiveCartBrowserStorageChangeEvent).pipe(
      startWith(this.createEventFromStorage()),
      map((event) => Boolean(event?.state?.active)),
      distinctUntilChanged(),
      takeWhile((hasCart) => !hasCart, true)
    );
  }

  createEventFromStorage() {
    const event = new ActiveCartBrowserStorageChangeEvent();
    event.state = this.getCartStateFromBrowserStorage();
    return event;
  }

  getCartStateFromBrowserStorage(): { active: string } {
    const state = this.statePersistenceService.readStateFromStorage({
      key: 'cart',
      context: this.siteContextParamsService.getValue(BASE_SITE_CONTEXT_ID),
      storageType: this.config?.cart?.storageType,
    });
    return state as { active: string };
  }
}
