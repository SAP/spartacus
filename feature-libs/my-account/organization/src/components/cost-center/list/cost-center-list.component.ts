import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CostCenterListService } from './cost-center-list.service';

@Component({
  selector: 'cx-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterListComponent {
  @HostBinding('class') hostClass = 'organization';

  dataTable$: Observable<Table> = this.costCentersService.getTable();

  constructor(protected costCentersService: CostCenterListService) {}

  /**
   * Paginates the list, including sorting.
   */
  paginate(pagination: PaginationModel, currentPage: number): void {
    this.costCentersService.pagination = { ...pagination, currentPage };
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   */
  sort(pagination: PaginationModel, sort: string) {
    this.costCentersService.pagination = {
      ...pagination,
      currentPage: 0,
      sort,
    };
  }
}
