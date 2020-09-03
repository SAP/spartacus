import { Component } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UnitRoleType } from '../../../shared/organization.model';
import { CurrentUnitService } from '../../current-unit.service';
import { UnitAssignApproversService } from './unit-assign-approvers.service';

@Component({
  selector: 'cx-unit-assign-approvers',
  templateUrl: './unit-assign-approvers.component.html',
})
export class UnitAssignApproversComponent {
  code$ = this.currentUnitService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.unitAssignApproversService.getTable(code, UnitRoleType.APPROVER)
    )
  );

  constructor(
    protected unitAssignApproversService: UnitAssignApproversService,
    protected currentUnitService: CurrentUnitService
  ) {}

  toggleAssign(orgUnitId: string, orgCustomerId: string, checked: boolean) {
    this.unitAssignApproversService.toggleAssign(
      orgUnitId,
      orgCustomerId,
      UnitRoleType.APPROVER,
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
