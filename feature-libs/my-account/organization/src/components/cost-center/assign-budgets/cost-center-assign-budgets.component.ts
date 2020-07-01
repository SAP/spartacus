import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CostCenterBudgetService } from './cost-center-budget.service';

@Component({
  selector: 'cx-cost-center-assign-budgets',
  templateUrl: './cost-center-assign-budgets.component.html',
})
export class CostCenterAssignBudgetsComponent {
  protected costCenterCode: string;

  protected code$: Observable<string> = this.router.parent.parent.params.pipe(
    map((params) => params['code']),
    tap((code) => (this.costCenterCode = code))
  );

  budgets$ = this.code$.pipe(
    switchMap((code) => this.costCenterBudgetService.getDataTable(code))
  );

  constructor(
    protected router: ActivatedRoute,
    protected costCenterBudgetService: CostCenterBudgetService
  ) {}

  /**
   * resets the current page to 0 as otherwise the sorting acts weird.
   */
  sort(sort: string): void {
    this.costCenterBudgetService.search({ sort, currentPage: 0 });
  }

  paginate(): void {
    this.costCenterBudgetService.search({ pageSize: 3 });
  }

  toggleAssign(event: Event, budgetCode: string) {
    this.costCenterBudgetService.toggleAssign(
      this.costCenterCode,
      budgetCode,
      (event.target as HTMLInputElement).checked
    );
  }

  // ngOnInit(): void {

  //   this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
  //     withLatestFrom(this.code$),
  //     tap(([queryParams, code]) =>
  //       this.costCenterService.loadBudgets(code, queryParams)
  //     ),
  //     switchMap(([queryParams, code]) =>
  //       this.costCenterService.getBudgets(code, queryParams).pipe(
  //         filter(Boolean),
  //         map((budgetsList: EntitiesModel<Budget>) => ({
  //           sorts: budgetsList.sorts,
  //           pagination: budgetsList.pagination,
  //           values: budgetsList.values.map((budget) => ({
  //             selected: budget.selected,
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
  //           })),
  //         }))
  //       )
  //     )
  //   );
  // }

  // unassign({ row }) {
  //   this.costCenterService.unassignBudget(this.code, row.code);
  // }
}
