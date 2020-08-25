import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BudgetModel } from '../../../budget/list/budget-list.service';
import { OrganizationLinkComponent } from '../organization-link.component';

@Component({
  templateUrl: '../organization-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountComponent extends OrganizationLinkComponent<BudgetModel> {
  get property() {
    return this.model.budget + ' ' + this.model.currency;
  }
}
