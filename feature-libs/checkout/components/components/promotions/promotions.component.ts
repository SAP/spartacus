import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Promotion } from '@spartacus/core';

@Component({
  selector: 'cx-promotions',
  templateUrl: './promotions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionsComponent {
  @Input()
  promotions: Promotion[];

  constructor() {}
}
