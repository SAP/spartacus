import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { B2BSearchConfig } from '@spartacus/core';
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
  paginate(pageConfig: B2BSearchConfig): void {
    if (pageConfig.sort) {
      pageConfig.currentPage = 0;
    }
    this.costCentersService.config = pageConfig;
  }

  sort(pageConfig: B2BSearchConfig, sort: string) {
    this.costCentersService.config = {
      ...pageConfig,
      currentPage: 0,
      sort,
    };
  }

  more(pageConfig: B2BSearchConfig) {
    const config = {
      ...pageConfig,
      currentPage: (pageConfig.currentPage ?? 0) + 1,
      infiniteScroll: true,
    };

    this.costCentersService.config = config;
  }
}
