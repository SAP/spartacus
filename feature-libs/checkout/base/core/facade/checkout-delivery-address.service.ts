import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutQueryFacade,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Address,
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  QueryState,
  StateWithMultiCart,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutDeliveryAddressConnector } from '../connectors/delivery-address/checkout-delivery-address.connector';

@Injectable()
export class CheckoutDeliveryAddressService
  implements CheckoutDeliveryAddressFacade
{
  protected createDeliveryAddressCommand: Command<Address, unknown> =
    this.command.create<Address>(
      (payload) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            return this.checkoutDeliveryConnector
              .createAddress(userId, cartId, payload)
              .pipe(
                tap(() => {
                  if (userId !== OCC_USER_ID_ANONYMOUS) {
                    /**
                     * TODO: We have to keep this here, since the user address feature is still ngrx-based.
                     * Remove once it is switched from ngrx to c&q.
                     * We should dispatch an event, which will reload the userAddress$ query.
                     */
                    this.store.dispatch(
                      new UserActions.LoadUserAddresses(userId)
                    );
                  }
                }),
                map((address) => {
                  address.titleCode = payload.titleCode;
                  if (payload.region?.isocodeShort) {
                    address.region = {
                      ...address.region,
                      isocodeShort: payload.region.isocodeShort,
                    };
                  }
                  return address;
                }),
                switchMap((address) => this.setDeliveryAddress(address))
              );
          })
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected setDeliveryAddressCommand: Command<Address, unknown> =
    this.command.create<Address>(
      (address) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            const addressId = address.id;
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
                      address,
                    },
                    DeliveryAddressSetEvent
                  );
                })
              );
          })
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected clearDeliveryAddressCommand: Command<void, unknown> =
    this.command.create<void>(
      () =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutDeliveryConnector
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
              )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  constructor(
    // TODO: remove once all the occurrences are replaced with events
    protected store: Store<StateWithMultiCart>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected eventService: EventService,
    protected command: CommandService,
    protected checkoutDeliveryConnector: CheckoutDeliveryAddressConnector,
    protected checkoutQuery: CheckoutQueryFacade
  ) {}

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(): Observable<[string, string]> {
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

  /**
   * Get delivery address
   */
  getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
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
