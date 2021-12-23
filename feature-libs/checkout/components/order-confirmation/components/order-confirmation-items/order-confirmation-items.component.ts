import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CartOutlets, PromotionLocation } from '@spartacus/cart/main/root';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationItemsComponent implements OnInit, OnDestroy {
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order>;
  readonly CartOutlets = CartOutlets;

  constructor(protected checkoutService: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}
