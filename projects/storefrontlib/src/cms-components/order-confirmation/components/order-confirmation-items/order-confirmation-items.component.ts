import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  CheckoutService,
  Order,
  PromotionLocation,
  PromotionResult,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationItemsComponent implements OnInit, OnDestroy {
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order>;
  orderPromotions$: Observable<PromotionResult[]>;

  constructor(protected checkoutService: CheckoutService) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
    this.orderPromotions$ = of([]);
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}
