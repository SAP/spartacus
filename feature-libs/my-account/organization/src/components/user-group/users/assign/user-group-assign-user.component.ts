import { Component } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentUserGroupService } from '../../services/current-user-group.service';
import { UserGroupAssignUserService } from './user-group-assign-user.service';

@Component({
  selector: 'cx-user-group-assign-user',
  templateUrl: './user-group-assign-user.component.html',
})
export class UserGroupAssignUsersComponent {
  /**
   * The code of the current user group
   */
  code$ = this.currentUserGroupService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.assignService.getTable(code))
  );

  constructor(
    protected currentUserGroupService: CurrentUserGroupService,
    protected assignService: UserGroupAssignUserService
  ) {}

  toggleAssign(userGroupCode: string, userCode: string, checked: boolean) {
    this.assignService.toggleAssign(userGroupCode, userCode, checked);
  }

  unassignAll(userGroupCode: string) {
    this.assignService.unassignAll(userGroupCode);
  }

  /**
   * Paginates the cost center list. Pagination is not using query parameters, as we like
   * pagination to be driven by infinite scrolling going forward.
   */
  viewPage(pagination: PaginationModel, currentPage: number): void {
    this.assignService.viewPage(pagination, currentPage);
  }

  /**
   * Sort the list. The pagination is reset to the first page.
   *
   * TODO: consider query parameter for sorting.
   */
  sort(pagination: PaginationModel, sort: string) {
    this.assignService.sort(pagination, sort);
  }
}
