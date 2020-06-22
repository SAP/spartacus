import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { SplitService } from '../../shared/split-view/split/split.service';
import { Table } from '../../shared/table/table.model';
import { CostCenterService } from './cost-center-list.service';

@Component({
  selector: 'cx-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SplitService],
})
export class CostCenterListComponent {
  @HostBinding('class.open') routeOpen: boolean;

  dataTable$: Observable<Table> = this.costCentersService.getDataTable();

  /**
   * Maintains the depth of levels for the split view. If multiple views come
   * into play, the number grows. We bind the number to an attribute on the `split-view`
   * element, so that we can control the view logic in CSS.
   */
  levels$: Observable<number> = this.splitService.level$;

  constructor(
    protected costCentersService: CostCenterService,
    protected splitService: SplitService
  ) {}

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
