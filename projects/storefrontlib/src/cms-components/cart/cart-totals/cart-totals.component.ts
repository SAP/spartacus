import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Cart, OrderEntry, CartService } from '@spartacus/core';
import { ExpressCheckoutService } from '../../checkout/services/express-checkout.service';

@Component({
  selector: 'cx-cart-totals',
  templateUrl: './cart-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTotalsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  s$;

  constructor(
    protected cartService: CartService,
    private expressCheckoutService: ExpressCheckoutService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
    // this.s$ = this.expressCheckoutService.shippingAddress$.subscribe(console.log);
    this.s$ = this.expressCheckoutService.deliveryMode$.subscribe(console.log);
  }
}
