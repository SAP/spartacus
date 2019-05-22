import { Component, OnInit } from '@angular/core';
import {
  SaveForLaterService,
  Cart,
  OrderEntry,
  CartService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Item } from '../cart-shared';

@Component({
  selector: 'cx-save-for-later',
  templateUrl: './save-for-later.component.html',
})
export class SaveForLaterComponent implements OnInit {
  sflCart$: Observable<Cart>;
  sflEntries$: Observable<OrderEntry[]>;
  sflCartLoaded$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private saveForLaterService: SaveForLaterService
  ) {}

  ngOnInit() {
    this.sflCart$ = this.saveForLaterService.getSaveForLater();
    this.sflEntries$ = this.saveForLaterService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
    this.sflCartLoaded$ = this.saveForLaterService.getLoaded();
  }

  saveItemForLater(item: Item): void {
    this.saveForLaterService.addEntry(item.product.code, item.quantity);
    this.cartService.removeEntry(item);
  }

  moveItemToCart(item: Item): void {
    this.cartService.addEntry(item.product.code, item.quantity);
    this.saveForLaterService.removeEntry(item);
  }
}
