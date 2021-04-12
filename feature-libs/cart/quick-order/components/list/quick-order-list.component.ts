import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry } from 'projects/core/src/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-quick-order-list',
  templateUrl: './quick-order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderListComponent {
  entries$: Observable<OrderEntry>;
}
