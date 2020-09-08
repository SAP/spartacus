import { Component } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentUserService } from '../../current-user.service';
import { UserAssignPermissionsListService } from './user-assign-permissions.service';

@Component({
  selector: 'cx-user-assign-permissions',
  templateUrl: './user-assign-permissions.component.html',
})
export class UserAssignPermissionsComponent {
  code$: Observable<string> = this.currentUserService.key$;
  name$: Observable<string> = this.currentUserService.name$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.assignService.getTable(code))
  );

  constructor(
    protected currentUserService: CurrentUserService,
    protected assignService: UserAssignPermissionsListService
  ) {}

  toggleAssign(userCode: string, permissionCode: string, checked: boolean) {
    this.assignService.toggleAssign(userCode, permissionCode, checked);
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
