import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UnitRoleType } from '../../../shared/organization.model';
import { CurrentUnitService } from '../../current-unit.service';
import { UnitApproverListService } from './unit-approver-list.service';

@Component({
  selector: 'cx-unit-approver-list',
  templateUrl: './unit-approver-list.component.html',
})
export class UnitApproverListComponent {
  code$ = this.currentUnitService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.unitApproversService.getTable(code, UnitRoleType.APPROVER)
    )
  );

  constructor(
    protected unitApproversService: UnitApproverListService,
    protected currentUnitService: CurrentUnitService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) =>
        this.unitApproversService.unassign(code, model.customerId)
      );
  }
}
