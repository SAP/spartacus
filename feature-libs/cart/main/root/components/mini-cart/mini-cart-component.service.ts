import { Injectable } from '@angular/core';
import {
  AuthService,
  BASE_SITE_CONTEXT_ID,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
  UnifiedInjector,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
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
    protected siteContextParamsService: SiteContextParamsService,
    protected injector: UnifiedInjector
  ) {}

  /**
   * This function supports lazy loading of the cart functoinality's code. We only call
   * the activeCartFacade if we know there is actually a cart.
   * Without a cart, we can return a default value and
   * avoid loading the cart library code.
   */
  getQuantity(): Observable<number> {
    return this.watchUntilCartFacadeRequired().pipe(
      switchMap((userHasCart) => {
        if (userHasCart) {
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

  /**
   * This function supports lazy loading of the cart functoinality's code. We only call
   * the activeCartFacade if we know there is actually a cart.
   * Without a cart, we can return a default value and
   * avoid loading the cart library code.
   */
  getTotalPrice(): Observable<string> {
    return this.watchUntilCartFacadeRequired().pipe(
      switchMap((userHasCart) => {
        if (userHasCart) {
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

  watchUntilCartFacadeRequired() {
    return combineLatest([
      this.browserHasCartInStorage(),
      this.authService.isUserLoggedIn(),
      this.isCartFacadeLoaded(),
    ]).pipe(
      tap(([hasCartInStorage, isUserLoggedIn, isCartFacadeLoaded]) =>
        console.log(
          `[hasCartInStorage, isUserLoggedIn, isCartFacadeLoaded] = [${hasCartInStorage}, ${isUserLoggedIn}, ${isCartFacadeLoaded}]`
        )
      ),
      map(
        ([hasCartInStorage, isUserLoggedIn, isCartFacadeLoaded]) =>
          hasCartInStorage || isUserLoggedIn || isCartFacadeLoaded
      ),
      distinctUntilChanged(),
      tap((userhascart) => console.log('userhascart', userhascart)),
      takeWhile((hasCart) => !hasCart, true)
    );
  }

  browserHasCartInStorage(): Observable<boolean> {
    return this.getCartStateFromBrowserStorage().pipe(
      map((state) => Boolean(state?.active))
    );
  }

  isCartFacadeLoaded(): Observable<boolean> {
    return this.injector.get(ActiveCartFacade).pipe(
      tap((activeCartFacade) =>
        console.log(
          'activeCartFacade instanceof ActiveCartFacade',
          activeCartFacade instanceof ActiveCartFacade,
          activeCartFacade
        )
      ),
      map(
        (activeCartFacade) => !(activeCartFacade instanceof ActiveCartFacade)
      ),
      distinctUntilChanged()
    );
  }

  getCartStateFromBrowserStorage(): Observable<{ active: string } | undefined> {
    return this.siteContextParamsService.getValues([BASE_SITE_CONTEXT_ID]).pipe(
      map((context) => {
        return this.statePersistenceService.readStateFromStorage({
          key: 'cart',
          context: context,
          storageType: this.config?.cart?.storageType,
        });
      })
    );
  }
}
