import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BudgetModel } from '../../budget/list/budget-list.service';
import { OrganizationLinkComponent } from './organization-link.component';

@Component({
  template: `
    <a [routerLink]="{ cxRoute: cxRoute, params: model } | cxUrl">
      <span class="text">
        {{ model.startDate | cxDate }} - {{ model.endDate | cxDate }}
      </span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent extends OrganizationLinkComponent<
  BudgetModel
> {}
