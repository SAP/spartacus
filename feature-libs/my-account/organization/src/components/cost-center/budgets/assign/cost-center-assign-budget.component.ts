import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CostCenterAssignBudgetListService } from './cost-center-assign-budget.service';
import { PaginationModel } from '@spartacus/core';

@Component({
  selector: 'cx-cost-center-assign-budget',
  templateUrl: './cost-center-assign-budget.component.html',
})
export class CostCenterAssignBudgetsComponent {
  code$: Observable<string> = this.activateRoute.parent.parent.params.pipe(
    map((params) => params['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.assignService.getTable(code))
  );

  constructor(
    // we can't do without the router as the routingService is unable to
    // resolve the parent routing params. `paramsInheritanceStrategy: 'always'`
    // would actually fix that.
    protected activateRoute: ActivatedRoute,
    protected assignService: CostCenterAssignBudgetListService
  ) {}

  toggleAssign(costCenterCode: string, budgetCode: string, checked: boolean) {
    this.assignService.toggleAssign(costCenterCode, budgetCode, checked);
  }

  /**
   * Paginates the cost center list. Pagination is not using query parameters, as we like
   * pagination to be driven by infinite scrolling going forward.
   */
  viewPage(pagination: PaginationModel, currentPage: number): void {
    this.assignService.viewPage(pagination, currentPage);
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   *
   * TODO: consider query parameter for sorting.
   */
  sort(pagination: PaginationModel, sort: string) {
    this.assignService.sort(pagination, sort);
  }
}
