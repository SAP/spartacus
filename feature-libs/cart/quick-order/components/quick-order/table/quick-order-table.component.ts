import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';

@Component({
  selector: 'cx-quick-order-table',
  templateUrl: './quick-order-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderTableComponent {
  entries$ = this.quickOrderService.getEntries();

  constructor(protected quickOrderService: QuickOrderFacade) {}
}
