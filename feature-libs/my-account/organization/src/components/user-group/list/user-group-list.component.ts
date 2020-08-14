import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { UserGroupListService } from './user-group-list.service';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-user-group-list',
  templateUrl: './user-group-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupListComponent {
  @HostBinding('class') hostClass = BASE_CLASS;

  dataTable$: Observable<Table> = this.userGroupsService.getTable();

  constructor(protected userGroupsService: UserGroupListService) {}

  /**
   * Paginates the cost center list. Pagination is not using query parameters, as we like
   * pagination to be driven by infinite scrolling going forward.
   */
  viewPage(pagination: PaginationModel, currentPage: number): void {
    this.userGroupsService.viewPage(pagination, currentPage);
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   *
   * TODO: consider query parameter for sorting.
   */
  sort(pagination: PaginationModel, sort: string) {
    this.userGroupsService.sort(pagination, sort);
  }
}
