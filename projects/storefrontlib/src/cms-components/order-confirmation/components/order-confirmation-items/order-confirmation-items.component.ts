import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutService, Order, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationItemsComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;

  constructor(protected checkoutService: CheckoutService) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }

  getAppliedPromotionsForOrder(order: Order): PromotionResult[] {
    const appliedPromotions = [];
    appliedPromotions.push(...(order.appliedOrderPromotions || []));
    appliedPromotions.push(...(order.appliedProductPromotions || []));

    return [...appliedPromotions];
  }
}
