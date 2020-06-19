import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../shared/table/table.model';
import { CostCenterService } from './cost-center-list.service';

@Component({
  selector: 'cx-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterListComponent {
  @HostBinding('class.open') routeOpen: boolean;

  dataTable$: Observable<Table> = this.costCentersService.getDataTable();

  constructor(protected costCentersService: CostCenterService) {}

  /**
   * resets the current page to 0 as otherwise the sorting acts weird.
   */
  sort(sort: string): void {
    this.costCentersService.search({ sort, currentPage: 0 });
  }

  paginate(): void {
    this.costCentersService.search({ pageSize: 3 });
  }
}
