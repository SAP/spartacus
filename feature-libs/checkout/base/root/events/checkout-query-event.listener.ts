import { Injectable, OnDestroy } from '@angular/core';
import { MergeCartSuccessEvent } from '@spartacus/cart/base/root';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CurrencySetEvent,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
} from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { merge, Subscription } from 'rxjs';
import {
  CheckoutReloadQueryEvent,
  CheckoutResetQueryEvent,
} from './checkout.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutQueryEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onGetQueryReload();
    this.onGetQueryReset();
  }

  protected onGetQueryReload(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LanguageSetEvent),
        this.eventService.get(CurrencySetEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, CheckoutReloadQueryEvent);
      })
    );
  }

  protected onGetQueryReset(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LogoutEvent),
        this.eventService.get(LoginEvent),
        this.eventService.get(SaveCartSuccessEvent),
        this.eventService.get(RestoreSavedCartSuccessEvent),
        this.eventService.get(MergeCartSuccessEvent),
        this.eventService.get(OrderPlacedEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, CheckoutResetQueryEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
