import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { B2BUserService } from '../../../../core/services/b2b-user.service';
import {
  OrganizationListService,
  OrganizationTableType,
} from '../../../shared';

@Injectable({
  providedIn: 'root',
})
export class UserAssignApproversService extends OrganizationListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.USER_ASSIGN_APPROVERS;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.userService.getApprovers(code, structure.options?.pagination);
  }

  toggleAssign(userId: string, orgCustomerId: string, assign = true) {
    if (assign) {
      this.userService.assignApprover(userId, orgCustomerId);
    } else {
      this.userService.unassignApprover(userId, orgCustomerId);
    }
  }
}
