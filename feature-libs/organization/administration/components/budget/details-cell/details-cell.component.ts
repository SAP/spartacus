import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-budget-details-cell',
  templateUrl: './details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsCellComponent extends CellComponent {
  public get key() {
    return this.model.code;
  }
}
