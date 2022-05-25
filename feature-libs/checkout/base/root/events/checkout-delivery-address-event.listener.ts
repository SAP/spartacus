import { Injectable, OnDestroy } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  DeleteUserAddressEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LoadUserAddressesEvent,
  OCC_USER_ID_ANONYMOUS,
  UpdateUserAddressEvent,
  UserAddressEvent,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CheckoutDeliveryAddressFacade } from '../facade/checkout-delivery-address.facade';
import {
  CheckoutClearDeliveryAddressEvent,
  CheckoutCreateDeliveryAddressEvent,
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
  CheckoutSetDeliveryAddressEvent,
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
    // new 'single events' to discuss
    this.onCreateDeliveryAddress();
    this.onSetDeliveryAddress();
    this.onClearDeliveryAddress();

    // keep?
    this.onUserAddressChange();
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

  // new way?

  protected onCreateDeliveryAddress(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutCreateDeliveryAddressEvent)
        .subscribe(({ cartId, userId }) => {
          if (userId !== OCC_USER_ID_ANONYMOUS) {
            this.eventService.dispatch({ userId }, LoadUserAddressesEvent);
          }

          // from the created event. no need for transitive event right?
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
  }

  protected onSetDeliveryAddress(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutSetDeliveryAddressEvent)
        .subscribe(({ userId, cartId }) => {
          this.eventService.dispatch(
            { userId, cartId },
            CheckoutResetDeliveryModesEvent
          );

          this.eventService.dispatch({}, CheckoutResetQueryEvent);
        })
    );
  }

  protected onClearDeliveryAddress(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutClearDeliveryAddressEvent)
        .subscribe(() =>
          this.eventService.dispatch({}, CheckoutResetQueryEvent)
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
