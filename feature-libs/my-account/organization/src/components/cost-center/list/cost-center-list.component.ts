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
  @HostBinding('class') hostClass = 'organization cost-center';

  dataTable$: Observable<Table> = this.costCentersService.getDataTable();

  constructor(protected costCentersService: CostCenterListService) {}

  /**
   * resets the current page to 0 as otherwise the sorting acts weird.
   */
  paginate(pageConfig: B2BSearchConfig): void {
    this.costCentersService.search(pageConfig);
  }
}
