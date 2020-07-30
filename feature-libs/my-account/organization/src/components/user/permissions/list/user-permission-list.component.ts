import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { UserPermissionListService } from './user-permission-list.service';

@Component({
  selector: 'cx-user-permission-list',
  templateUrl: './user-permission-list.component.html',
})
export class UserPermissionListComponent {
  code$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.userPermissionListService.getTable(code))
  );

  constructor(
    protected route: ActivatedRoute,
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
