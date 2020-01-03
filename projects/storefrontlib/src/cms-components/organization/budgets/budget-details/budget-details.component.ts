import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

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
  budgetCode$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['budgetCode']));

  private costCenterColumns = {
    name: 'costCenter.name',
    description: 'costCenter.description',
  };

  ngOnInit(): void {
    this.budget$ = this.budgetCode$.pipe(
      tap(code => this.budgetsService.loadBudget(code)),
      switchMap(code => this.budgetsService.get(code)),
      filter(Boolean),
      map((budget: Budget) => ({
        ...budget,
        costCenters:
          budget.costCenters &&
          budget.costCenters.map(costCenter => ({
            name: costCenter.name,
            description: costCenter.code,
          })),
      }))
    );
  }

  getCostCenterColumns(): Observable<Array<{ key: string; value: string }>> {
    return resolveKeyAndValueBy(this.costCenterColumns, text =>
      this.translation.translate(text).pipe(take(1))
    );
  }

  update(budget: Budget) {
    this.budgetCode$
      .pipe(take(1))
      .subscribe(budgetCode => this.budgetsService.update(budgetCode, budget));
  }
}
