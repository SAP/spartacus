import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  CartType,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  CheckoutConnector,
  CheckoutQueryService,
} from '@spartacus/checkout/base/core';
import {
  OCC_USER_ID_ANONYMOUS,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class OpfCheckoutQueryService extends CheckoutQueryService {
  protected multiCartFacade = inject(MultiCartFacade);
  protected multipleCartCart = false;

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected queryService: QueryService,
    protected checkoutConnector: CheckoutConnector
  ) {
    console.log('florent OpfCheckoutQueryService1');
    super(activeCartFacade, userIdService, queryService, checkoutConnector);
  }

  setMultipleCart(multiple: boolean) {
    this.multipleCartCart = multiple;
  }

  protected checkoutPreconditions(): Observable<[string, string]> {
    console.log('florent OpfCheckoutQueryService2', this.multipleCartCart);
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
