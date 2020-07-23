import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PaginationModel, RoutingService, RouterState } from '@spartacus/core';
import { Table, BreakpointService, BREAKPOINT } from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { CostCenterListService } from './cost-center-list.service';
import { map } from 'rxjs/operators';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterListComponent {
  @HostBinding('class') hostClass = BASE_CLASS;

  dataTable$: Observable<Table> = this.costCentersService.getTable();

  subscription = new Subscription();

  protected fullScreenViews = ['create', 'edit', 'assign'];
  protected nonBreakable = ['xs', 'sm'];

  maxViews$ = combineLatest([
    this.routingService.getRouterState(),
    this.breakpointService.breakpoint$,
  ]).pipe(
    map(([state, breakPoint]: [RouterState, BREAKPOINT]) => {
      if (this.nonBreakable.includes(breakPoint)) {
        return;
      }
      const lastPath = state.state?.url.split('/').reverse()[0];
      return this.fullScreenViews.includes(lastPath) ? 1 : 2;
    })
  );

  constructor(
    protected costCentersService: CostCenterListService,
    protected routingService: RoutingService,
    protected breakpointService: BreakpointService
  ) {}

  /**
   * Paginates the cost center list. Pagination is not using query parameters, as we like
   * pagination to be driven by infinite scrolling going forward.
   */
  viewPage(pagination: PaginationModel, currentPage: number): void {
    this.costCentersService.viewPage(pagination, currentPage);
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   *
   * TODO: consider query parameter for sorting.
   */
  sort(pagination: PaginationModel, sort: string) {
    this.costCentersService.sort(pagination, sort);
  }
}
