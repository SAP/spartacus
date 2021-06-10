import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order, PromotionLocation, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationItemsComponent implements OnInit, OnDestroy {
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order>;
  orderPromotions$: Observable<PromotionResult[]>;

  constructor(protected checkoutService: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
    this.orderPromotions$ = this.checkoutService
      .getOrderDetails()
      .pipe(map((order) => order.appliedOrderPromotions || []));
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}
