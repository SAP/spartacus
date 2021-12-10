import { Injectable } from '@angular/core';
import {
  AuthService,
  BASE_SITE_CONTEXT_ID,
  FacadeFactoryService,
  SiteContextParamsService,
  StatePersistenceService,
  StorageSyncType,
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
} from 'rxjs/operators';
import { ActiveCartFacade } from '../../facade/active-cart.facade';

@Injectable({
  providedIn: 'root',
})
export class MiniCartComponentService {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected authService: AuthService,
    protected statePersistenceService: StatePersistenceService,
    protected siteContextParamsService: SiteContextParamsService,
    protected injector: UnifiedInjector,
    protected facadeFactoryService: FacadeFactoryService
  ) {}

  /**
   * This function supports lazy loading of the cart functoinality's code. We only call
   * the activeCartFacade if we know there is actually a cart.
   * Without a cart, we can return a default value and
   * avoid loading the cart library code.
   */
  getQuantity(): Observable<number> {
    return this.activeCartRequired().pipe(
      switchMap((activeCartRequired) => {
        if (activeCartRequired) {
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
    return this.activeCartRequired().pipe(
      switchMap((activeCartRequired) => {
        if (activeCartRequired) {
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
  protected activeCartRequired() {
    return combineLatest([
      this.hasActiveCartInStorage(),
      this.authService.isUserLoggedIn(),
      this.isActiveCartFacadeImplProvided(),
    ]).pipe(
      map(
        ([hasCartInStorage, isUserLoggedIn, isActiveCartFacadeImplProvided]) =>
          hasCartInStorage || isUserLoggedIn || isActiveCartFacadeImplProvided
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

  /**
   * When lazy loading is used, the ActiveCartFacade is imiplemented
   * with a proxy class.  When the code chunk with the ActiveCartFacade
   * is lazy loaded, the ActiveCartFacade proxy is replaced with the actual
   * ActiveCartFacade implementation.  This is why we can use this to evaluate
   * if the library chunk that contains the ActiveCartFacade imiplementation has be
   * loaded already or not.
   */
  protected isActiveCartFacadeImplProvided(): Observable<boolean> {
    return this.injector.get(ActiveCartFacade).pipe(
      map(
        (activeCartFacade) =>
          activeCartFacade !== undefined &&
          !this.facadeFactoryService.isProxyFacadeInstance(activeCartFacade)
      ),
      distinctUntilChanged()
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
