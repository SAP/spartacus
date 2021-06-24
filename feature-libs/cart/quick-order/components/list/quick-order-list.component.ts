import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuickOrderService } from '../../core/services/quick-order.service';

@Component({
  selector: 'cx-quick-order-list',
  templateUrl: './quick-order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderListComponent {
  entries$ = this.quickOrderService.getEntries();

  constructor(protected quickOrderService: QuickOrderService) {}
}
