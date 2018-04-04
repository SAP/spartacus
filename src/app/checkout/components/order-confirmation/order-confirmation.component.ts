import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'y-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  order: any;

  constructor(protected checkoutService: CheckoutService) {}

  ngOnInit() {
    this.order = this.checkoutService.orderDetails;
  }

  ngOnDestroy() {
    this.checkoutService.orderDetails = undefined;
  }
}
