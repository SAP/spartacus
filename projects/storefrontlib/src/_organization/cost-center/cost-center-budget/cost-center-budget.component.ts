import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CostCenterService, CxDatePipe, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'cx-cost-center-budget',
  templateUrl: './cost-center-budget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterBudgetComponent {
  cxRoute = 'costCenterBudgets';

  costCenterBudget$: Observable<any> = of({});

  constructor(
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService,
    protected cxDate: CxDatePipe
  ) {}
}
