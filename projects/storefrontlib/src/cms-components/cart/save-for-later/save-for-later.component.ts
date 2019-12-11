import { Component, OnInit } from '@angular/core';
import {
  SelectiveCartService,
  Cart,
  OrderEntry,
  ActiveCartService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Item } from '../cart-shared/cart-item/cart-item.component';

@Component({
  selector: 'cx-save-for-later',
  templateUrl: './save-for-later.component.html',
})
export class SaveForLaterComponent implements OnInit {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;

  constructor(
    protected cartService: ActiveCartService,
    protected selectiveCartService: SelectiveCartService
  ) {}

  ngOnInit() {
    this.cart$ = this.selectiveCartService.getCart();
    this.entries$ = this.selectiveCartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
    // this.cartLoaded$ = this.selectiveCartService.getLoaded();
    this.cartLoaded$ = combineLatest([
      this.cartService.getLoaded(),
      this.selectiveCartService.getLoaded(),
    ]).pipe(map(([cartLoaded, slfLoaded]) => cartLoaded && slfLoaded));
  }

  moveToCart(item: Item) {
    this.selectiveCartService.removeEntry(item);
    this.cartService.addEntry(item.product.code, item.quantity);
  }
}
