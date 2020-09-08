import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CurrentUserGroupService } from '../../current-user-group.service';
import { UserGroupPermissionListService } from './user-group-permission-list.service';

@Component({
  selector: 'cx-user-group-permission-list',
  templateUrl: './user-group-permission-list.component.html',
})
export class UserGroupPermissionListComponent {
  /**
   * The code of the current user group
   */
  code$ = this.currentUserGroupService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.userGroupUserListService.getTable(code))
  );

  constructor(
    protected currentUserGroupService: CurrentUserGroupService,
    protected userGroupUserListService: UserGroupPermissionListService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) => this.userGroupUserListService.unassign(code, model));
  }
}
