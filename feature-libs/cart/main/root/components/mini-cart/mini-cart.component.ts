import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import {
  BASE_SITE_CONTEXT_ID,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
  StorageSyncType,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { CartPersistentStorageChangeEvent } from '../../events/cart.events';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  iconTypes = ICON_TYPE;

  quantity$: Observable<number> = this.browserHasCartInStorage().pipe(
    switchMap((hasCart) => {
      if (hasCart) {
        console.log('browserHasCartInStorage == true, using cart facade');
        return this.activeCartService.getActive().pipe(
          startWith({ deliveryItemsQuantity: 0 }),
          map((cart) => cart.deliveryItemsQuantity || 0)
        );
      } else {
        console.log('browserHasCartInStorage == false, using default 0 count');
        return of(0);
      }
    })
  );

  // total$: Observable<string> = this.activeCartService.getActive().pipe(
  //   filter((cart) => !!cart.totalPrice),
  //   map((cart) => cart.totalPrice?.formattedValue ?? '')
  // );

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected eventService: EventService,
    protected statePersistenceService: StatePersistenceService,
    protected siteContextParamsService: SiteContextParamsService
  ) {
    // this.eventService
    //   .get(CartPersistentStorageChangeEvent)
    //   .pipe(startWith(this.getCartStateFromBrowserStorage()))
    //   .subscribe((event) => {
    //     console.log(`CartPersistentStorageChangeEvent caught`, event);
    //   });
  }

  browserHasCartInStorage(): Observable<boolean> {
    return this.eventService.get(CartPersistentStorageChangeEvent).pipe(
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
    const event = new CartPersistentStorageChangeEvent();
    event.state = this.getCartStateFromBrowserStorage();
    return event;
  }

  getCartStateFromBrowserStorage(): { active: string } {
    const state = this.statePersistenceService.readStateFromStorage({
      key: 'cart',
      context: this.siteContextParamsService.getValue(BASE_SITE_CONTEXT_ID),
      storageType: StorageSyncType.LOCAL_STORAGE,
    });
    //state['active'] = state['active'] + '-fromstorage';
    return state as { active: string };
  }
}
