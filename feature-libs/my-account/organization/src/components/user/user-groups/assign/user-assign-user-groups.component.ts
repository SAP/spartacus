import { Component } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentUserService } from '../../current-user.service';
import { UserAssignUserGroupListService } from './user-assign-user-groups.service';

@Component({
  selector: 'cx-user-assign-user-groups',
  templateUrl: './user-assign-user-groups.component.html',
})
export class UserAssignUserGroupsComponent {
  code$: Observable<string> = this.currentUserService.code$;
  name$: Observable<string> = this.currentUserService.name$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.assignService.getTable(code))
  );

  constructor(
    protected currentUserService: CurrentUserService,
    protected assignService: UserAssignUserGroupListService
  ) {}

  toggleAssign(userCode: string, userGroupCode: string, checked: boolean) {
    this.assignService.toggleAssign(userCode, userGroupCode, checked);
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
