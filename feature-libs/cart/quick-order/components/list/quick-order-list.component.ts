import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-quick-order-list',
  templateUrl: './quick-order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderListComponent {}
