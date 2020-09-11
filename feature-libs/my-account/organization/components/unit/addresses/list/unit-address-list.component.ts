import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { CurrentUnitService } from '../../current-unit.service';
import { UnitAddressListService } from './unit-address-list.service';

@Component({
  selector: 'cx-unit-address-list',
  templateUrl: './unit-address-list.component.html',
})
export class UnitAddressListComponent {
  code$ = this.currentUnitService.key$;

  dataTable$ = this.code$.pipe(
    switchMap((code) => this.unitAddressListService.getTable(code))
  );

  constructor(
    protected unitAddressListService: UnitAddressListService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
