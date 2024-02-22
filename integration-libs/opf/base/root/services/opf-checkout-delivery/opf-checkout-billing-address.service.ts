import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  CartType,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { CheckoutBillingAddressService } from '@spartacus/checkout/base/core';
import {
  CommandService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { CheckoutBillingAddressConnector } from 'feature-libs/checkout/base/core/connectors/checkout-billing-address/checkout-billing-address.connector';
import { Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OpfCheckoutQueryService } from './opf-checkout-query.service';

@Injectable()
export class OpfCheckoutBillingAddressService extends CheckoutBillingAddressService {
  protected multiCartFacade = inject(MultiCartFacade);
  protected multipleCartCart = false;

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected commandService: CommandService,
    protected checkoutBillingAddressConnector: CheckoutBillingAddressConnector,
    protected checkoutQueryFacade: OpfCheckoutQueryService
  ) {
    super(
      activeCartFacade,
      userIdService,
      commandService,
      checkoutBillingAddressConnector,
      checkoutQueryFacade
    );
  }

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
}
