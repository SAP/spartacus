import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Table } from '@spartacus/storefront';
import { UnitManageAddressesService } from './unit-manage-addresses.service';
import { CurrentUnitService } from '../current-unit.service';

@Component({
  selector: 'cx-unit-manage-addresses',
  templateUrl: './unit-manage-addresses.component.html',
})
export class UnitManageAddressesComponent {
  code$ = this.currentUnitService.code$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitManageAddressesService.getTable(code))
  );

  constructor(
    protected unitManageAddressesService: UnitManageAddressesService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
