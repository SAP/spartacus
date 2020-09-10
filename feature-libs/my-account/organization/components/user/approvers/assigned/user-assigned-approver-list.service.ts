import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserApproverListService } from '../user-approver-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserAssignedApproverListService extends UserApproverListService {
  protected tableType = OrganizationTableType.USER_ASSIGNED_APPROVERS;

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return super
      .load(structure, code)
      .pipe(map((userGroups) => this.filterSelected(userGroups)));
  }
}
