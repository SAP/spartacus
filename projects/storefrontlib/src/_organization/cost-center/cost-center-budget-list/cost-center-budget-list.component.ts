import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Budget,
  CostCenterService,
  CxDatePipe,
  EntitiesModel,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../../cms-components/organization/abstract-component/abstract-listing.component';
import { Table } from '../../../_organization/shared/table/table.model';

@Component({
  selector: 'cx-cost-center-budget-list',
  templateUrl: './cost-center-budget-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterBudgetListComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'costCenterBudgets';

  // dataTable$: Observable<Table> = of({
  //   type: 'budgetsList',
  //   structure: {
  //     labels: [{ key: 'name' }],
  //     hideLabels: true,
  //   },
  //   data: [{ code: 'budget1', name: 'budget 1', active: true }],

  // });

  dataTable$: Observable<Table>;

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
                costCenterCode: code,
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
                active: budget.active,
              })),
          }))
        )
      )
    );

    this.dataTable$ = this.data$.pipe(
      map((data) => {
        return {
          type: 'budgetsList',
          structure: {
            labels: [{ key: 'name' }],
            hideLabels: true,
          },
          data: data.values, //[{ code: 'budget1', name: 'budget 1', active: true }],
          pagination: data.pagination,
          sorts: data.sorts,
        };
      })
    );
  }
}
