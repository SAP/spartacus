import { Component } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentCostCenterService } from '../../services/current-cost-center.service';
import { CostCenterAssignBudgetListService } from './cost-center-assign-budgets.service';

@Component({
  selector: 'cx-cost-center-assign-budgets',
  templateUrl: './cost-center-assign-budgets.component.html',
})
export class CostCenterAssignBudgetsComponent {
  /**
   * The code of the current cost center.
   */
  code$ = this.currentCostCenterService$.key$;

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
