import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { UserGroupPermissionListService } from './user-group-permission-list.service';

@Component({
  selector: 'cx-user-group-permission-list',
  templateUrl: './user-group-permission-list.component.html',
})
export class UserGroupPermissionListComponent {
  code$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.userGroupUserListService.getTable(code))
  );

  constructor(
    protected route: ActivatedRoute,
    protected userGroupUserListService: UserGroupPermissionListService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) => this.userGroupUserListService.unassign(code, model));
  }
}
