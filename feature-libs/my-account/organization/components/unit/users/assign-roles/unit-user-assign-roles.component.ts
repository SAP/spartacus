import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUser, PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UnitRoleType } from '../../../shared/organization.model';
import { CurrentUnitService } from '../../current-unit.service';
import { UnitUserAssignRolesService } from './unit-user-assign-roles.service';

@Component({
  selector: 'cx-unit-user-assign-roles',
  templateUrl: './unit-user-assign-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitUserAssignRolesComponent {
  readonly rolesMap = UnitRoleType;
  protected readonly B2B_CUSTOMER_ROLE_ID = UnitRoleType.CUSTOMER;

  code$ = this.currentUnitService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.unitAssignRolesService.getTable(code, this.B2B_CUSTOMER_ROLE_ID)
    )
  );

  constructor(
    protected unitAssignRolesService: UnitUserAssignRolesService,
    protected currentUnitService: CurrentUnitService
  ) {}

  toggleAssign(
    orgCustomerId: string,
    userRoles: string[],
    role: string,
    checked: boolean
  ) {
    this.unitAssignRolesService.toggleAssign(
      orgCustomerId,
      userRoles,
      role,
      checked
    );
  }

  viewPage(pagination: PaginationModel, currentPage: number): void {
    this.unitAssignRolesService.viewPage(pagination, currentPage);
  }

  sort(pagination: PaginationModel, sort: string) {
    this.unitAssignRolesService.sort(pagination, sort);
  }

  checkIfContainsRole(model: B2BUser, role: string): boolean {
    return model.roles.indexOf(role) !== -1;
  }
}
