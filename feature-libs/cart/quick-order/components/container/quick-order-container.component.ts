import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveCartService, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  QuickOrderService,
  QuickOrderStatePersistenceService,
} from '@spartacus/cart/quick-order/core';

@Component({
  selector: 'cx-quick-order-container',
  templateUrl: './quick-order-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderComponent implements OnInit {
  cartId$: Observable<string>;
  entries$: Observable<OrderEntry[]>;

  constructor(
    protected activeCartService: ActiveCartService,
    protected quickOrderService: QuickOrderService,
    protected quickOrderStatePersistenceService: QuickOrderStatePersistenceService
  ) {}

  ngOnInit(): void {
    this.cartId$ = this.activeCartService.getActiveCartId();
    this.entries$ = this.quickOrderService.getEntries();

    this.quickOrderStatePersistenceService.initSync();
  }

  clear(): void {
    this.quickOrderService.clearList();
  }

  addToCart(): void {
    this.entries$.subscribe((entries) => {
      this.activeCartService.addEntries(entries);
      this.quickOrderService.clearList();
    });
  }
}
