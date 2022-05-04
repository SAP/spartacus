import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';


@Component({
  selector: 'cx-future-stock',
  templateUrl: './future-stock-trigger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureStockTriggerComponent {
}
