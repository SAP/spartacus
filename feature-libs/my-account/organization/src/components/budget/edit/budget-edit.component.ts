import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';
import { OrganizationFormService } from '../../shared/organization-edit/organization-form.service';
import { BudgetFormService } from '../form/budget-form.service';
import { CurrentBudgetService } from '../services/current-budget.service';

@Component({
  selector: 'cx-budget-edit',
  templateUrl: './budget-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CurrentOrganizationItemService,
      useExisting: CurrentBudgetService,
    },
    {
      provide: OrganizationFormService,
      useExisting: BudgetFormService,
    },
  ],
})
export class BudgetEditComponent {}
