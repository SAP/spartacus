import { Component } from '@angular/core';
import { UrlCommandRoute } from '@spartacus/core';

@Component({
  selector: 'cx-budget-create',
  templateUrl: './budget-create.component.html',
})
export class BudgetCreateComponent {
  routerBackLink: UrlCommandRoute = {
    cxRoute: 'budgets',
  };

}
