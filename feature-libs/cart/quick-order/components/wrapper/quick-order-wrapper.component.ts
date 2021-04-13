import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-quick-order-wrapper',
  templateUrl: './quick-order-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderComponent {}
