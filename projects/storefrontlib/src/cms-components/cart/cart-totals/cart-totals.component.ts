import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cart, CartService, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-totals',
  templateUrl: './cart-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTotalsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;

  constructor(protected cartService: CartService) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
  }
}
