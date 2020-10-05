import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { UserGroup } from '@spartacus/my-account/organization/core';
import { TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserUserGroupListService } from '../user-user-group-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserAssignedUserGroupListService extends UserUserGroupListService {
  protected tableType = OrganizationTableType.USER_ASSIGNED_USER_GROUPS;

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<UserGroup>> {
    return super.load(structure, code).pipe(
      filter((list) => Boolean(list)),
      map((userGroups) => this.filterSelected(userGroups))
    );
  }
}
