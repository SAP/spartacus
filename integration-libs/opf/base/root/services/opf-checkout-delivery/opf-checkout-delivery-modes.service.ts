import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  CartType,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryModesConnector,
  CheckoutDeliveryModesService,
} from '@spartacus/checkout/base/core';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { OpfCheckoutQueryService } from './opf-checkout-query.service';

@Injectable()
export class OpfCheckoutDeliveryModesService extends CheckoutDeliveryModesService {
  protected multiCartFacade = inject(MultiCartFacade);
  protected multipleCartCart = false;

  protected setDeliveryModeCommand: Command<string, unknown> =
    this.commandService.create<string>(
      (deliveryModeCode) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutDeliveryModesConnector.setMode(
              userId,
              cartId,
              deliveryModeCode
            )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  setMultipleCart(multiple: boolean) {
    this.multipleCartCart = multiple;
  }

  protected checkoutPreconditions(): Observable<[string, string]> {
    const cartId$ = this.multipleCartCart
      ? this.multiCartFacade.getCartIdByType(CartType.NEW_CREATED)
      : this.activeCartFacade.takeActiveCartId();
    return combineLatest([
      this.userIdService.takeUserId(),
      cartId$,
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      take(1),
      map(([userId, cartId, isGuestCart]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected eventService: EventService,
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected checkoutDeliveryModesConnector: CheckoutDeliveryModesConnector,
    protected checkoutQueryFacade: OpfCheckoutQueryService
  ) {
    super(
      activeCartFacade,
      userIdService,
      eventService,
      queryService,
      commandService,
      checkoutDeliveryModesConnector,
      checkoutQueryFacade
    );
  }
}
