import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UrlCommandRoute } from '@spartacus/core';

@Component({
  selector: 'cx-budget-create',
  templateUrl: './budget-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetCreateComponent {
  routerBackLink: UrlCommandRoute = {
    cxRoute: 'budgets',
  };

  backToList() {}
}
