import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Budget } from '@spartacus/organization/administration/core';
import { ItemService } from '../../shared/item.service';
import { BudgetItemService } from '../services/budget-item.service';
import { DetailsComponent } from '../../shared/detail/detail.component';

@Component({
  selector: 'cx-org-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: BudgetItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class BudgetDetailsComponent extends DetailsComponent<Budget> {}
