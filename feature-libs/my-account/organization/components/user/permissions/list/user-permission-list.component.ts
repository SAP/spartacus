import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CurrentUserService } from '../../current-user.service';
import { UserPermissionListService } from './user-permission-list.service';

@Component({
  selector: 'cx-user-permission-list',
  templateUrl: './user-permission-list.component.html',
})
export class UserPermissionListComponent {
  code$: Observable<string> = this.currentUserService.key$;
  name$: Observable<string> = this.currentUserService.name$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.userPermissionListService.getTable(code))
  );

  constructor(
    protected currentUserService: CurrentUserService,
    protected userPermissionListService: UserPermissionListService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) =>
        this.userPermissionListService.unassign(code, model)
      );
  }
}
