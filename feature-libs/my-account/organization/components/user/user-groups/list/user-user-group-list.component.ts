import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CurrentUserService } from '../../current-user.service';
import { UserUserGroupListService } from './user-user-group-list.service';

@Component({
  selector: 'cx-user-user-group-list',
  templateUrl: './user-user-group-list.component.html',
})
export class UserUserGroupListComponent {
  code$: Observable<string> = this.currentUserService.key$;
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
