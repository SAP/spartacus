import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Table } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { UnitUsersService } from './unit-users.service';

@Component({
  selector: 'cx-unit-users',
  templateUrl: './unit-users.component.html',
})
export class UnitUsersComponent {
  cxRoute = 'orgUnitUsers';
  roleId = 'b2bcustomergroup';

  code$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitUsersService.getTable(code, this.roleId))
  );

  constructor(
    protected route: ActivatedRoute,
    protected unitUsersService: UnitUsersService
  ) {}
}
