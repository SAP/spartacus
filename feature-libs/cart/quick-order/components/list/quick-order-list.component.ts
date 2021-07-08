import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuickOrderService } from '@spartacus/cart/quick-order/core';

@Component({
  selector: 'cx-quick-order-list',
  templateUrl: './quick-order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderListComponent {
  entries$ = this.quickOrderService.getEntries();

  constructor(protected quickOrderService: QuickOrderService) {}
}
