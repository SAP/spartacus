import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { CostCenterService } from 'feature-libs/my-account/organization/src/core';
import { Budget } from '../../../core/model/budget.model';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';

@Component({
  template: `
    <button (click)="assign()" class="link">
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignBudgetCellComponent {
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected currentOrganizationItemService: CurrentOrganizationItemService<
      Budget
    >,
    protected costCenterService: CostCenterService
  ) {}

  get isAssigned(): boolean {
    return this.outlet.context.selected;
  }

  assign() {
    this.currentOrganizationItemService.key$
      .subscribe((key) => {
        this.isAssigned
          ? this.costCenterService.unassignBudget(key, this.outlet.context.code)
          : this.costCenterService.assignBudget(key, this.outlet.context.code);
      })
      .unsubscribe();
  }
}
