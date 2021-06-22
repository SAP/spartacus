import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveCartService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { QuickOrderStatePersistenceService } from '../../core/services/quick-order-state-persistance.service';
import { QuickOrderService } from '../../core/services/quick-order.service';

@Component({
  selector: 'cx-quick-order-container',
  templateUrl: './quick-order-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderComponent implements OnInit {
  cartId$: Observable<string> = this.activeCartService.getActiveCartId();
  entries$ = this.quickOrderService.getEntries();

  constructor(
    protected activeCartService: ActiveCartService,
    protected quickOrderService: QuickOrderService,
    protected quickOrderStatePersistenceService: QuickOrderStatePersistenceService
  ) {}

  ngOnInit(): void {
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
