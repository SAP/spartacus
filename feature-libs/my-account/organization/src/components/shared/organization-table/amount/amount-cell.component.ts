import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BudgetModel } from '../../../budget/list/budget-list.service';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  templateUrl: '../organization-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountCellComponent extends OrganizationCellComponent<
  BudgetModel
> {
  get property() {
    return this.model.budget + ' ' + this.model.currency;
  }
}
