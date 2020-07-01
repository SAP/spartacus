import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostCenterService, CxDatePipe, RoutingService } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'cx-cost-center-budgets',
  templateUrl: './cost-center-budgets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterBudgetListComponent implements OnInit {
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
    protected router: ActivatedRoute,
    protected costCenterService: CostCenterService,
    protected cxDate: CxDatePipe
  ) {}

  code$: Observable<string> = this.router.params.pipe(
    map((routingData) => routingData['code'])
  );

  ngOnInit(): void {
    // this.data$ = <Observable<ListingModel>>this.queryParamsForAllItems$.pipe(
    //   withLatestFrom(this.code$),
    //   tap(([queryParams, code]) =>
    //     this.costCenterService.loadBudgets(code, queryParams)
    //   ),
    //   switchMap(([queryParams, code]) =>
    //     this.costCenterService.getBudgets(code, queryParams).pipe(
    //       filter(Boolean),
    //       map((budgetsList: EntitiesModel<Budget>) => ({
    //         sorts: budgetsList.sorts,
    //         pagination: budgetsList.pagination,
    //         values: budgetsList.values
    //           .filter((budget) => budget.selected)
    //           .map((budget) => ({
    //             costCenterCode: code,
    //             code: budget.code,
    //             name: budget.name,
    //             amount: `${budget.budget} ${
    //               budget.currency && budget.currency.symbol
    //             }`,
    //             startEndDate: `${this.cxDate.transform(
    //               budget.startDate
    //             )} - ${this.cxDate.transform(budget.endDate)}`,
    //             parentUnit: budget.orgUnit && budget.orgUnit.name,
    //             uid: budget.orgUnit && budget.orgUnit.uid,
    //             active: budget.active,
    //           })),
    //       }))
    //     )
    //   )
    // );
    // this.dataTable$ = this.data$.pipe(
    //   map((data) => {
    //     return {
    //       type: 'budgetsList',
    //       structure: {
    //         labels: [{ key: 'name' }],
    //         hideLabels: true,
    //       },
    //       data: data.values, //[{ code: 'budget1', name: 'budget 1', active: true }],
    //       pagination: data.pagination,
    //       sorts: data.sorts,
    //     };
    //   })
    // );
  }
}
