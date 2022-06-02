import { Injectable, OnDestroy } from '@angular/core';
import {
  CurrencySetEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageSetEvent,
  LoadUserPaymentMethodsEvent,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import {
  CheckoutPaymentDetailsCreatedEvent,
  CheckoutPaymentDetailsSetEvent,
  CheckoutReloadPaymentCardTypesEvent,
  CheckoutResetQueryEvent,
} from './checkout.events';

/**
 * Checkout payment event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutPaymentEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected globalMessageService: GlobalMessageService
  ) {
    this.onPaymentCreated();
    this.onPaymentSet();

    this.onGetCardTypesReloadReload();
  }

  protected onPaymentCreated(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutPaymentDetailsCreatedEvent)
        .subscribe(({ userId }) => {
          if (userId !== OCC_USER_ID_ANONYMOUS) {
            this.eventService.dispatch({ userId }, LoadUserPaymentMethodsEvent);
          }

          this.globalMessageService.add(
            { key: 'paymentForm.paymentAddedSuccessfully' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
          this.eventService.dispatch({}, CheckoutResetQueryEvent);
        })
    );
  }

  protected onPaymentSet(): void {
    this.subscriptions.add(
      this.eventService.get(CheckoutPaymentDetailsSetEvent).subscribe(() => {
        this.eventService.dispatch({}, CheckoutResetQueryEvent);
      })
    );
  }

  protected onGetCardTypesReloadReload(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LanguageSetEvent),
        this.eventService.get(CurrencySetEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, CheckoutReloadPaymentCardTypesEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
