import { Injectable, OnDestroy } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  DeleteUserAddressEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  UpdateUserAddressEvent,
  UserAddressEvent,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CheckoutDeliveryAddressFacade } from '../facade/checkout-delivery-address.facade';
import {
  CheckoutClearDeliveryAddressEvent,
  CheckoutDeliveryAddressClearedEvent,
  CheckoutDeliveryAddressCreatedEvent,
  CheckoutDeliveryAddressSetEvent,
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from './checkout.events';

/**
 * Checkout delivery address event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutDeliveryAddressEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected eventService: EventService,
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade
  ) {
    this.onUserAddressChange();
    this.onDeliveryAddressChange();
  }

  /**
   * Registers listeners for the User address events.
   */
  protected onUserAddressChange(): void {
    this.subscriptions.add(
      this.eventService
        .get(UserAddressEvent)
        .pipe(
          filter(
            (event) =>
              event instanceof UpdateUserAddressEvent ||
              event instanceof DeleteUserAddressEvent
          ),
          switchMap(({ userId }) =>
            this.activeCartFacade
              .takeActiveCartId()
              .pipe(map((cartId) => ({ cartId, userId })))
          )
        )
        .subscribe(({ cartId, userId }) => {
          // we want to LL the checkout (if not already loaded), in order to clear the checkout data that's potentially set on the back-end
          this.checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress();

          this.eventService.dispatch(
            { cartId, userId },
            CheckoutResetDeliveryModesEvent
          );
        })
    );
  }

  /**
   * Registers listeners on the Delivery address set event
   */
  protected onDeliveryAddressChange(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryAddressCreatedEvent)
        .subscribe(({ userId, cartId }) => {
          this.globalMessageService.add(
            { key: 'addressForm.userAddressAddSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );

          this.eventService.dispatch(
            { userId, cartId },
            CheckoutResetDeliveryModesEvent
          );

          this.eventService.dispatch({}, CheckoutResetQueryEvent);
        })
    );
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryAddressSetEvent)
        .subscribe(({ userId, cartId }) => {
          this.eventService.dispatch(
            { userId, cartId },
            CheckoutResetDeliveryModesEvent
          );

          this.eventService.dispatch({}, CheckoutResetQueryEvent);
        })
    );

    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryAddressClearedEvent)
        .subscribe(() =>
          this.eventService.dispatch({}, CheckoutResetQueryEvent)
        )
    );

    this.subscriptions.add(
      this.eventService
        .get(CheckoutClearDeliveryAddressEvent)
        .subscribe(() =>
          this.checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress()
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
