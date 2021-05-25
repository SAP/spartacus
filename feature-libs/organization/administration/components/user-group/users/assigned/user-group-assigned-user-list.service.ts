import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserGroupUserListService } from '../user-group-user-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserGroupAssignedUserListService extends UserGroupUserListService {
  protected tableType = OrganizationTableType.USER_GROUP_ASSIGNED_USERS;
  /**
   * @override
   * Load all b2b users assigned to the given user group
   */
  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return super
      .load(pagination, code)
      .pipe(map((users) => this.filterSelected(users)));
  }
}
