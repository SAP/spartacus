import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Table } from '@spartacus/storefront';
import { UnitAddressListService } from './unit-address-list.service';
import { CurrentUnitService } from '../../current-unit.service';

@Component({
  selector: 'cx-unit-address-list',
  templateUrl: './unit-address-list.component.html',
})
export class UnitAddressListComponent {
  code$ = this.currentUnitService.code$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitManageAddressesService.getTable(code))
  );

  constructor(
    protected unitManageAddressesService: UnitAddressListService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
