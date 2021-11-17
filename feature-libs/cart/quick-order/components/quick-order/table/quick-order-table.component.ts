import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/core';

@Component({
  selector: 'cx-quick-order-table',
  templateUrl: './quick-order-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderTableComponent {
  @Input()
  entries: OrderEntry[] = [];

  @Input()
  loading: boolean = false;
}
