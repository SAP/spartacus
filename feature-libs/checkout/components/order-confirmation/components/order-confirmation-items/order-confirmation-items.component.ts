import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order, PromotionResult } from '@spartacus/core';
import { CheckoutPromotionService } from 'feature-libs/checkout/core/services/checkout-promotion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationItemsComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;
  orderPromotions$: Observable<PromotionResult[]>;
  constructor(
    protected checkoutService: CheckoutFacade,
    protected promotionService: CheckoutPromotionService
  ) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
    this.orderPromotions$ = this.promotionService.getOrderPromotions();
  }

  getAllOrderEntryPromotions(
    order: Order
  ): { [key: string]: Observable<PromotionResult[]> } {
    const allOrderEntryPromotions = this.promotionService.getProductPromotionForOrderEntries(
      order
    );
    console.log('getAllOrderEntryPromotions', allOrderEntryPromotions);
    return allOrderEntryPromotions;
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}
