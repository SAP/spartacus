import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PaginationModel, RoutingService } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CostCenterListService } from './cost-center-list.service';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterListComponent {
  @HostBinding('class') hostClass = BASE_CLASS;

  dataTable$: Observable<Table> = this.costCentersService.getTable();

  code$ = this.routingService
    .getParams()
    .pipe(map((params) => params['costCenterKey']));

  constructor(
    protected costCentersService: CostCenterListService,
    protected routingService: RoutingService
  ) {}

  /**
   * Paginates the cost center list. Pagination is not using query parameters, as we like
   * pagination to be driven by infinite scrolling going forward.
   */
  viewPage(event: { pagination: PaginationModel; page: number }): void {
    this.costCentersService.viewPage(event.pagination, event.page);
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   *
   * TODO: consider query parameter for sorting.
   */
  sort(event: { pagination: PaginationModel; sort: string }) {
    this.costCentersService.sort(event.pagination, event.sort);
  }
}
