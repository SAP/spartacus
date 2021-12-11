import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  CartOutlets,
  OrderDetailsContext,
  ORDER_DETAILS_CONTEXT,
  PromotionLocation,
} from '@spartacus/cart/main/root';
import {
  CheckoutFacade,
  OrderPlacedEvent,
} from '@spartacus/checkout/base/root';
import { EventService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { ContextService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './checkout-order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderConfirmationItemsComponent implements OnDestroy {
  protected orderDetailsContext$: Observable<OrderDetailsContext | undefined> =
    this.contextService.get<OrderDetailsContext>(ORDER_DETAILS_CONTEXT);

  readonly cartOutlets = CartOutlets;
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order | undefined> = this.checkoutFacade.getOrder();

  test$ = this.orderDetailsContext$.pipe(
    switchMap(
      (orderDetailsContext) =>
        orderDetailsContext?.getOrder?.() ?? of(undefined)
    )
  );

  constructor(
    protected checkoutFacade: CheckoutFacade,
    // testing
    protected contextService: ContextService,
    protected eventService: EventService
  ) {
    this.eventService.get(OrderPlacedEvent).subscribe((ok) => console.log(ok));

    this.eventService
      .get(OrderPlacedEvent)
      .pipe(
        map((orderDetails) => orderDetails.order),
        tap((base) => console.log('const details', base))
      )
      .subscribe((test) => console.log('test', test));
    this.test$.subscribe((why) => console.log('why', why));
  }

  ngOnDestroy() {
    this.checkoutFacade.clearOrder();
  }
}
