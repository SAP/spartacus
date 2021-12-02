import { Injectable } from '@angular/core';
import {
  BASE_SITE_CONTEXT_ID,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeWhile,
  tap,
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

    return this.browserHasCartInStorage().pipe(
      switchMap((hasCart) => {
        if (hasCart) {
          console.log(
            'quantity$ browserHasCartInStorage == true, using cart facade'
          );
          return this.activeCartFacade.getActive().pipe(
            startWith({ deliveryItemsQuantity: 0 }),
            map((cart) => cart.deliveryItemsQuantity || 0)
          );
        } else {
          console.log(
            'quantity$ browserHasCartInStorage == false, using default 0 count'
          );
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

    return this.browserHasCartInStorage().pipe(
      switchMap((hasCart) => {
        if (hasCart) {
          console.log(
            'total$: - browserHasCartInStorage == true, using cart facade'
          );
          return this.activeCartFacade.getActive().pipe(
            filter((cart) => !!cart.totalPrice),
            map((cart) => cart.totalPrice?.formattedValue ?? '')
          );
        } else {
          console.log(
            'total$: - browserHasCartInStorage == false, using default 0 count'
          );
          return of('');
        }
      })
    );
  }

  browserHasCartInStorage(): Observable<boolean> {
    return this.eventService.get(ActiveCartBrowserStorageChangeEvent).pipe(
      startWith(this.createEventFromStorage()),
      tap((event) =>
        console.log('browser storage active value: ', event?.state?.active)
      ),
      map((event) => Boolean(event?.state?.active)),
      distinctUntilChanged(),
      tap((active) => console.log('browser storage actiive boolean: ', active)),
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
