import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserAssignPermissionListService } from './user-assign-permission.service';
import { PaginationModel } from '@spartacus/core';
import { CurrentUserService } from '../../current-user.service';

@Component({
  selector: 'cx-user-assign-permission',
  templateUrl: './user-assign-permission.component.html',
})
export class UserAssignPermissionsComponent {
  code$: Observable<string> = this.currentUserService.code$;
  name$: Observable<string> = this.currentUserService.name$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.assignService.getTable(code))
  );

  constructor(
    protected currentUserService: CurrentUserService,
    protected assignService: UserAssignPermissionListService
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
