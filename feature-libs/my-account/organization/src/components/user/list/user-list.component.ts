import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { UserListService } from './user-list.service';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @HostBinding('class') hostClass = BASE_CLASS;

  dataTable$: Observable<Table> = this.usersService.getTable();

  constructor(protected usersService: UserListService) {}

  /**
   * Paginates the cost center list. Pagination is not using query parameters, as we like
   * pagination to be driven by infinite scrolling going forward.
   */
  viewPage(pagination: PaginationModel, currentPage: number): void {
    this.usersService.viewPage(pagination, currentPage);
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   *
   * TODO: consider query parameter for sorting.
   */
  sort(pagination: PaginationModel, sort: string) {
    this.usersService.sort(pagination, sort);
  }
}
