import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserUserGroupListService } from './user-user-group-list.service';
import { CurrentUserService } from '../../current-user.service';

@Component({
  selector: 'cx-user-user-group-list',
  templateUrl: './user-user-group-list.component.html',
})
export class UserUserGroupListComponent {
  code$: Observable<string> = this.currentUserService.code$;
  name$: Observable<string> = this.currentUserService.name$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.userUserGroupListService.getTable(code))
  );

  constructor(
    protected currentUserService: CurrentUserService,
    protected userUserGroupListService: UserUserGroupListService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) => this.userUserGroupListService.unassign(code, model));
  }
}
