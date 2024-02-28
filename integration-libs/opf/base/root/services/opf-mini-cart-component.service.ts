import { Injectable } from '@angular/core';
import { MiniCartComponentService } from '@spartacus/cart/base/components/mini-cart';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  AuthService,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfMiniCartComponentService extends MiniCartComponentService {
  freezeMiniCart$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected acceptUpdate$ = this.freezeMiniCart$.asObservable().pipe(
    tap((val) => console.log('freeze', val)),
    filter((freeze) => !freeze)
  );
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected authService: AuthService,
    protected statePersistenceService: StatePersistenceService,
    protected siteContextParamsService: SiteContextParamsService,
    protected eventService: EventService
  ) {
    super(
      activeCartFacade,
      authService,
      statePersistenceService,
      siteContextParamsService,
      eventService
    );
  }

  getQuantity(): Observable<number> {
    return this.acceptUpdate$.pipe(switchMap(() => super.getQuantity()));
  }

  getTotalPrice(): Observable<string> {
    return this.acceptUpdate$.pipe(switchMap(() => super.getTotalPrice()));
  }
}
