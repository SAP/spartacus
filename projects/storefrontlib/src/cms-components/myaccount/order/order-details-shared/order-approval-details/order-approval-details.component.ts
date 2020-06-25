import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from '@spartacus/core';

@Component({
  selector: 'cx-order-approval-details',
  templateUrl: './order-approval-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderApprovalDetailsComponent {
  @Input()
  order: Order;

  constructor() {}
}
