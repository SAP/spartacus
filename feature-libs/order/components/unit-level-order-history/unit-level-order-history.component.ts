import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'cx-unit-level-order-history',
  templateUrl: './unit-level-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitLevelOrderHistoryComponent {
  constructor(
  ) {
    alert('here!');
  }
}
