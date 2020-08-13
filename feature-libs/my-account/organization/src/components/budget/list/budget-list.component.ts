import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingParamService } from '../../routing-param.service';
import { BudgetListService } from './budget-list.service';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-budget-list',
  templateUrl: './budget-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetListComponent {
  @HostBinding('class') hostClass = BASE_CLASS;

  dataTable$: Observable<Table> = this.budgetService.getTable();

  code$ = this.routingParamService.params$.pipe(
    map((params) => params['budgetKey'])
  );

  constructor(
    protected routingParamService: RoutingParamService,
    protected budgetService: BudgetListService
  ) {}

  /**
   * Paginates the budget list. Pagination is not using query parameters, as we like
   * pagination to be driven by infinite scrolling going forward.
   */
  viewPage(pagination: PaginationModel, currentPage: number): void {
    this.budgetService.viewPage(pagination, currentPage);
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   *
   * TODO: consider query parameter for sorting.
   */
  sort(pagination: PaginationModel, sort: string) {
    this.budgetService.sort(pagination, sort);
  }
}
