import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnitApproversService } from './unit-approvers.service';

@Component({
  selector: 'cx-unit-approvers',
  templateUrl: './unit-approvers.component.html',
})
export class UnitApproversComponent {
  protected readonly APPROVERS_ROLE_ID = 'b2bapprovergroup';

  code$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.unitApproversService.getTable(code, this.APPROVERS_ROLE_ID)
    )
  );

  constructor(
    protected route: ActivatedRoute,
    protected unitApproversService: UnitApproversService
  ) {}
}
