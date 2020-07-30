import { Component } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentCostCenterService } from '../../current-cost-center.service';
import { CostCenterAssignBudgetListService } from './cost-center-assign-budget.service';

@Component({
  selector: 'cx-cost-center-assign-budget',
  templateUrl: './cost-center-assign-budget.component.html',
})
export class CostCenterAssignBudgetsComponent {
  /**
   * The code of the current cost center.
   */
  code$ = this.currentCostCenterService$.code$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.assignService.getTable(code))
  );

  constructor(
    protected currentCostCenterService$: CurrentCostCenterService,
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
