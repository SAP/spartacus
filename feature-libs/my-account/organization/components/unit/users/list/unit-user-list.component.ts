import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentUnitService } from '../../current-unit.service';
import { UnitUsersService } from './unit-users.service';
import { UserRole } from '@spartacus/my-account/organization/core';

@Component({
  selector: 'cx-unit-user-list',
  templateUrl: './unit-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitUserListComponent {
  code$ = this.currentUnitService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitUsersService.getTable(code, UserRole.CUSTOMER))
  );

  constructor(
    protected unitUsersService: UnitUsersService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
