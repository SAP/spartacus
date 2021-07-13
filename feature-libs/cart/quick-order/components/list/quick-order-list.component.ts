import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';

@Component({
  selector: 'cx-quick-order-list',
  templateUrl: './quick-order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderListComponent {
  entries$ = this.quickOrderService.getEntries();

  constructor(protected quickOrderService: QuickOrderFacade) {}
}
