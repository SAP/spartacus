import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { CheckoutService, RoutingService } from '@spartacus/core';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'cx-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceOrderComponent implements OnInit {
  tAndCToggler = false;

  @Output() clearCheckoutData = new EventEmitter<void>();

  constructor(
    private checkoutService: CheckoutService,
    private routingService: RoutingService
  ) {}

  toggleTAndC(): void {
    this.tAndCToggler = !this.tAndCToggler;
  }

  placeOrder(): void {
    this.checkoutService.placeOrder();
  }

  ngOnInit() {
    this.checkoutService
      .getOrderDetails()
      .pipe(filter(order => Object.keys(order).length !== 0))
      .subscribe(() => {
        // checkout steps are done
        this.clearCheckoutData.emit();
        this.routingService.go({ route: ['orderConfirmation'] });
      });
  }
}
