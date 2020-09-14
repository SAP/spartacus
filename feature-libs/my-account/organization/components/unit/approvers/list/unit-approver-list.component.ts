import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CurrentUnitService } from '../../current-unit.service';
import { UnitApproverListService } from './unit-approver-list.service';
import { UserRole } from '@spartacus/my-account/organization/core';

@Component({
  selector: 'cx-unit-approver-list',
  templateUrl: './unit-approver-list.component.html',
})
export class UnitApproverListComponent {
  code$ = this.currentUnitService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.unitApproverListService.getTable(code, UserRole.APPROVER)
    )
  );

  constructor(
    protected unitApproverListService: UnitApproverListService,
    protected currentUnitService: CurrentUnitService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) =>
        this.unitApproverListService.unassign(code, model.customerId)
      );
  }
}
