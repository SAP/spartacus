import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { UserAssignApproversService } from './user-assign-approvers.service';

@Component({
  selector: 'cx-user-assign-approvers',
  templateUrl: './user-assign-approvers.component.html',
})
export class UserAssignApproversComponent {
  protected readonly APPROVERS_ROLE_ID = 'b2bapprovergroup';

  code$: Observable<string> = this.activateRoute.parent.parent.params.pipe(
    map((params) => params['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.userAssignApproversService.getTable(code, this.APPROVERS_ROLE_ID)
    )
  );

  constructor(
    protected activateRoute: ActivatedRoute,
    protected userAssignApproversService: UserAssignApproversService
  ) {}

  toggleAssign(userId: string, orgCustomerId: string, checked: boolean) {
    this.userAssignApproversService.toggleAssign(
      userId,
      orgCustomerId,
      checked
    );
  }

  viewPage(pagination: PaginationModel, currentPage: number): void {
    this.userAssignApproversService.viewPage(pagination, currentPage);
  }

  sort(pagination: PaginationModel, sort: string) {
    this.userAssignApproversService.sort(pagination, sort);
  }
}
