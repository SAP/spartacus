import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { Permission } from '@spartacus/my-account/organization/core';
import { TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserGroupPermissionListService } from '../user-group-permission-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserGroupAssignedPermissionsListService extends UserGroupPermissionListService {
  protected tableType = OrganizationTableType.USER_GROUP_ASSIGNED_PERMISSIONS;
  /**
   * @override
   * Load all b2b users assigned to the given user group
   */
  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<Permission>> {
    return super
      .load(structure, code)
      .pipe(map((users) => this.filterSelected(users)));
  }
}
