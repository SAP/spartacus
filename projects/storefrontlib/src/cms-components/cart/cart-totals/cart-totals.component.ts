import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveCartService, Cart, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
@Component({
  selector: 'cx-cart-totals',
  templateUrl: './cart-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTotalsComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;

  constructor(protected activeCartService: ActiveCartService) {}

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();
    this.entries$ = this.activeCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));
  }
}
