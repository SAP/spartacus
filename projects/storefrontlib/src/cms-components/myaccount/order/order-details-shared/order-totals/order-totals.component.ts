import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from '@spartacus/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-order-totals',
  templateUrl: './order-totals.component.html',
})
export class OrderTotalsComponent {
  @Input()
  order: Order;

  constructor() {}
}
