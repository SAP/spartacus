import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnitApproversService } from './unit-approvers.service';
import { UnitRoleType } from '../../shared/organization.model';
import { CurrentUnitService } from '../current-unit.service';

@Component({
  selector: 'cx-unit-approvers',
  templateUrl: './unit-approvers.component.html',
})
export class UnitApproversComponent {
  code$ = this.currentUnitService.code$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.unitApproversService.getTable(code, UnitRoleType.APPROVER)
    )
  );

  constructor(
    protected unitApproversService: UnitApproversService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
