import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { useFeatureStyles } from '@spartacus/core';

@Component({
  selector: '[cx-punchout-inspect-cart-row]',
  templateUrl: './punchout-inspect-cart-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutInspectCartRowComponent {
  @Input() item: OrderEntry;
  constructor() {
    useFeatureStyles('a11yQTY2Quantity');
  }
}
