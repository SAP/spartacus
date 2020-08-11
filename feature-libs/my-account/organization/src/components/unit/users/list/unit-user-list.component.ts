import { ChangeDetectionStrategy, Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Table } from '@spartacus/storefront';
import { UnitUsersService } from './unit-users.service';
import { UnitRoleType } from '../../../shared/organization.model';
import { CurrentUnitService } from '../../current-unit.service';

@Component({
  selector: 'cx-unit-user-list',
  templateUrl: './unit-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitUserListComponent {
  code$ = this.currentUnitService.code$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.unitUsersService.getTable(code, UnitRoleType.CUSTOMER)
    )
  );

  constructor(
    protected unitUsersService: UnitUsersService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
