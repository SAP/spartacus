import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { UserGroupUserListService } from './user-group-user-list.service';

@Component({
  selector: 'cx-user-group-user-list',
  templateUrl: './user-group-user-list.component.html',
})
export class UserGroupUserListComponent {
  code$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.userGroupUserListService.getTable(code))
  );

  constructor(
    protected route: ActivatedRoute,
    protected userGroupUserListService: UserGroupUserListService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) => this.userGroupUserListService.unassign(code, model));
  }
}
