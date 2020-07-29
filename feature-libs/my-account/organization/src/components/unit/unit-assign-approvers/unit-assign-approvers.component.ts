import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { UnitAssignApproversService } from './unit-assign-approvers.service';

@Component({
  selector: 'cx-unit-assign-approvers',
  templateUrl: './unit-assign-approvers.component.html',
})
export class UnitAssignApproversComponent {
  protected readonly APPROVERS_ROLE_ID = 'b2bapprovergroup';

  code$: Observable<string> = this.activateRoute.parent.parent.params.pipe(
    map((params) => params['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.unitAssignApproversService.getTable(code, this.APPROVERS_ROLE_ID)
    )
  );

  constructor(
    protected activateRoute: ActivatedRoute,
    protected unitAssignApproversService: UnitAssignApproversService
  ) {}

  toggleAssign(orgUnitId: string, orgCustomerId: string, checked: boolean) {
    this.unitAssignApproversService.toggleAssign(
      orgUnitId,
      orgCustomerId,
      this.APPROVERS_ROLE_ID,
      checked
    );
  }

  viewPage(pagination: PaginationModel, currentPage: number): void {
    this.unitAssignApproversService.viewPage(pagination, currentPage);
  }

  sort(pagination: PaginationModel, sort: string) {
    this.unitAssignApproversService.sort(pagination, sort);
  }
}
