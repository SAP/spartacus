import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-amount-cell',
  templateUrl: '../cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountCellComponent extends CellComponent {
  get property(): string {
    if (this.budget && this.currency) {
      return this.budget + ' ' + this.currency;
    }
    return;
  }

  protected get budget() {
    return this.model.budget;
  }

  protected get currency() {
    return this.model.currency?.isocode || this.model.currency;
  }
}
