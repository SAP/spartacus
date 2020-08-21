import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CurrentUserGroupService } from '../../current-user-group.service';
import { UserGroupUserListService } from './user-group-user-list.service';

@Component({
  selector: 'cx-user-group-user-list',
  templateUrl: './user-group-user-list.component.html',
})
export class UserGroupUserListComponent {
  /**
   * The code of the current user group
   */
  code$ = this.currentUserGroupService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.userGroupUserListService.getTable(code))
  );

  constructor(
    protected currentUserGroupService: CurrentUserGroupService,
    protected userGroupUserListService: UserGroupUserListService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) => this.userGroupUserListService.unassign(code, model));
  }
}
