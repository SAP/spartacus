import { Component, Input } from '@angular/core';

import { OrderEntry } from '@spartacus/core';

@Component({
  selector: 'cx-cancellation-return-items',
  templateUrl: './cancellation-return-items.component.html',
})
export class CancellationReturnItemsComponent {
  @Input() entries: OrderEntry[];
  @Input() confirmation: boolean;
  @Input() cancelOrder: boolean;
}
