import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import {
  Budget,
  BudgetService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { resolveKeyAndValueBy } from '../../../../../../core/src/util/resolveObject';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected budgetsService: BudgetService,
    protected translation: TranslationService
  ) {}

  budget$: Observable<Budget>;

  private costCenterColumns = {
    name: 'costCenter.name',
    description: 'costCenter.description',
  };

  ngOnInit(): void {
    this.budget$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params['budgetCode']),
      switchMap(code => this.budgetsService.get(code)),
      map((budget: Budget) => ({
        ...budget,
        costCenters: [
          { name: 'MockedName1', description: 'Description1' },
          { name: 'MockedName2', description: 'Description2' },
        ],
        // budget.costCenters &&
        // budget.costCenters.map(costCenter => ({
        //   name: costCenter.name,
        //   description: costCenter.code,
        // })),
      }))
    );
  }

  getCostCenterColumns(): Observable<Array<{ key: string; value: string }>> {
    return resolveKeyAndValueBy(this.costCenterColumns, text =>
      this.translation.translate(text).pipe(take(1))
    );
  }
}
