import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  RoutingService,
  CxDatePipe,
  EntitiesModel,
  Budget,
  CostCenterService,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-cost-center-budgets',
  templateUrl: './cost-center-budgets.component.html',
})
export class CostCenterBudgetsComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'costCenterBudgets';

  constructor(
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService,
    protected cxDate: CxDatePipe
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.data$ = <Observable<ListingModel>>this.queryParamsForAllItems$.pipe(
      withLatestFrom(this.code$),
      tap(([queryParams, code]) =>
        this.costCenterService.loadBudgets(code, queryParams)
      ),
      switchMap(([queryParams, code]) =>
        this.costCenterService.getBudgets(code, queryParams).pipe(
          filter(Boolean),
          map((budgetsList: EntitiesModel<Budget>) => ({
            sorts: budgetsList.sorts,
            pagination: budgetsList.pagination,
            values: budgetsList.values
              .filter((budget) => budget.selected)
              .map((budget) => ({
                code: budget.code,
                name: budget.name,
                amount: `${budget.budget} ${
                  budget.currency && budget.currency.symbol
                }`,
                startEndDate: `${this.cxDate.transform(
                  budget.startDate
                )} - ${this.cxDate.transform(budget.endDate)}`,
                parentUnit: budget.orgUnit && budget.orgUnit.name,
                uid: budget.orgUnit && budget.orgUnit.uid,
              })),
          }))
        )
      )
    );
  }
}
