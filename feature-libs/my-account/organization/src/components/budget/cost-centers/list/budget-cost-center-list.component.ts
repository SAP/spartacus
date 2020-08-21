import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { PaginationModel } from 'projects/core/src/model/misc.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentBudgetService } from '../../current-budget.service';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

@Component({
  selector: 'cx-budget-cost-center-list',
  templateUrl: './budget-cost-center-list.component.html',
})
export class BudgetCostCenterListComponent {
  readonly budgetCode$: Observable<string> = this.currentBudgetService.key$;

  readonly dataTable$: Observable<Table> = this.budgetCode$.pipe(
    switchMap((code) => this.budgetCostCenterListService.getTable(code))
  );

  constructor(
    protected currentBudgetService: CurrentBudgetService,
    protected budgetCostCenterListService: BudgetCostCenterListService
  ) {}

  /**
   * Paginates the budget list. Pagination is not using query parameters, as we like
   * pagination to be driven by infinite scrolling going forward.
   */
  viewPage(event: { pagination: PaginationModel; page: number }): void {
    this.budgetCostCenterListService.viewPage(event.pagination, event.page);
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   *
   * TODO: consider query parameter for sorting.
   */
  sort(event: { pagination: PaginationModel; sort: string }) {
    this.budgetCostCenterListService.sort(event.pagination, event.sort);
  }
}
