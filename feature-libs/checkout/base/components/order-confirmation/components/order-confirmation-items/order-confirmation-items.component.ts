import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { Order, PromotionLocation } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationItemsComponent implements OnInit, OnDestroy {
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order | undefined>;

  constructor(protected checkoutFacade: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutFacade.getOrder();
  }

  ngOnDestroy() {
    this.checkoutFacade.clearOrder();
  }
}
