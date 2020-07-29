import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Table } from '@spartacus/storefront';
import { UnitManageAddressesService } from './unit-manage-addresses.service';

@Component({
  selector: 'cx-unit-manage-addresses',
  templateUrl: './unit-manage-addresses.component.html',
})
export class UnitManageAddressesComponent {
  code$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitManageAddressesService.getTable(code))
  );

  constructor(
    protected route: ActivatedRoute,
    protected unitManageAddressesService: UnitManageAddressesService
  ) {}
}
