import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  Budget,
  CostCenterService,
} from '@spartacus/my-account/organization/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { MessageService } from '../../shared/organization-message/services/message.service';

@Component({
  template: `
    <button (click)="assign()" class="link">
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignBudgetCellComponent implements OnDestroy {
  /**
   * Indicates that we need to show a notification message.
   */
  notify = false;

  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected organizationItemService: OrganizationItemService<Budget>,
    protected costCenterService: CostCenterService,
    protected messageService: MessageService
  ) {}

  get isAssigned(): boolean {
    return this.outlet.context.selected;
  }

  assign() {
    this.notify = true;
    this.organizationItemService.key$
      .subscribe((key) => {
        this.isAssigned
          ? this.costCenterService.unassignBudget(key, this.outlet.context.code)
          : this.costCenterService.assignBudget(key, this.outlet.context.code);
      })
      .unsubscribe();
  }

  ngOnDestroy() {
    // We're playing a trick here; The store is not equipped with a selector to select
    // any updated assignments. Moreover, as soon as an item is unassigned, it might not be available
    // anymore. This is why we add the message when this action is destroyed.
    if (this.notify) {
      this.messageService.add({
        message: {
          key: this.outlet.context.selected
            ? 'costCenter.budget.unassigned'
            : 'costCenter.budget.assigned',
        },
      });
    }
  }
}
