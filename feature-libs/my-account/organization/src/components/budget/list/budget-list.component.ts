import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { Budget, PaginationModel, RoutingService } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BudgetListService } from './budget-list.service';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-budget-list',
  templateUrl: './budget-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetListComponent implements OnInit {
  @HostBinding('class') hostClass = BASE_CLASS;
  type = 'budget';
  dataTable$: Observable<Table> = this.budgetService.getTable();

  code$ = this.routingService
    .getParams()
    .pipe(map((params) => params['budgetKey']));

  constructor(
    protected routingService: RoutingService,
    protected budgetService: BudgetListService
  ) {}

  ngOnInit() {
    // this.dataTable$ = this.budgetService.getTable();
  }

  /**
   * Paginates the budget list. Pagination is not using query parameters, as we like
   * pagination to be driven by infinite scrolling going forward.
   */
  viewPage(event: { pagination: PaginationModel; page: number }): void {
    this.budgetService.viewPage(event.pagination, event.page);
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   *
   * TODO: consider query parameter for sorting.
   */
  sort(event: { pagination: PaginationModel; sort: string }) {
    this.budgetService.sort(event.pagination, event.sort);
  }

  isActive(model: Budget, code: string) {
    return model.code === code ? -1 : 0;
  }
}
