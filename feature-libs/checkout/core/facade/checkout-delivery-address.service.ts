import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutQueryFacade,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Address,
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  QueryService,
  QueryState,
  StateWithMultiCart,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutDeliveryConnector } from '../connectors/delivery/checkout-delivery.connector';

@Injectable()
export class CheckoutDeliveryAddressService
  implements CheckoutDeliveryAddressFacade
{
  protected checkoutPreconditions() {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartService.takeActiveCartId(),
    ]).pipe(
      take(1),
      map(([userId, cartId]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS &&
            !this.activeCartService.isGuestCart())
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  protected createDeliveryAddressCommand: Command<Address, unknown> =
    this.command.create<Address>(
      (payload) => {
        return this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            return this.checkoutDeliveryConnector
              .createAddress(userId, cartId, payload)
              .pipe(
                tap(() => {
                  if (userId !== OCC_USER_ID_ANONYMOUS) {
                    this.store.dispatch(
                      new UserActions.LoadUserAddresses(userId)
                    );
                  }
                }),
                switchMap((address) => {
                  address['titleCode'] = payload.titleCode;
                  if (payload.region?.isocodeShort) {
                    Object.assign(address.region, {
                      isocodeShort: payload.region.isocodeShort,
                    });
                  }
                  return this.setDeliveryAddress(address);
                })
              );
          })
        );
      },
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected setDeliveryAddressCommand: Command<Address, unknown> =
    this.command.create<Address>(
      (payload) => {
        const addressId = payload.id;
        return this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            if (!addressId) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutDeliveryConnector
              .setAddress(userId, cartId, addressId)
              .pipe(
                tap(() => {
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      address: payload,
                    },
                    DeliveryAddressSetEvent
                  );
                })
              );
          })
        );
      },
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected clearDeliveryAddressCommand: Command<void, unknown> =
    this.command.create<void>(
      () => {
        return this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            return this.checkoutDeliveryConnector
              .clearCheckoutDeliveryAddress(userId, cartId)
              .pipe(
                tap(() => {
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                    },
                    DeliveryAddressClearedEvent
                  );
                })
              );
          })
        );
      },
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  constructor(
    protected store: Store<StateWithMultiCart>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected eventService: EventService,
    protected query: QueryService,
    protected command: CommandService,
    protected checkoutDeliveryConnector: CheckoutDeliveryConnector,
    protected checkoutConnector: CheckoutConnector,
    protected checkoutQuery: CheckoutQueryFacade
  ) {}

  /**
   * Get delivery address
   */
  getDeliveryAddress(): Observable<QueryState<Address | undefined>> {
    return this.checkoutQuery.getCheckoutDetailsState().pipe(
      map((state) => ({
        ...state,
        data: state.data?.deliveryAddress,
      }))
    );
  }

  /**
   * Create and set a delivery address using the address param
   * @param address : the Address to be created and set
   */
  createAndSetAddress(address: Address): Observable<unknown> {
    return this.createDeliveryAddressCommand.execute(address);
  }

  /**
   * Set delivery address
   * @param address : The address to be set
   */
  setDeliveryAddress(address: Address): Observable<unknown> {
    return this.setDeliveryAddressCommand.execute(address);
  }

  /**
   * Clear address already setup in last checkout process
   */
  clearCheckoutDeliveryAddress(): Observable<unknown> {
    return this.clearDeliveryAddressCommand.execute();
  }
}
