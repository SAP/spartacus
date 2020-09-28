import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../../shared/index';
import { UnitApproverListService } from '../unit-approver-list.service';

@Injectable({
  providedIn: 'root',
})
export class UnitAssignedApproverListService extends UnitApproverListService {
  protected tableType = OrganizationTableType.UNIT_ASSIGNED_APPROVERS;

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return super
      .load(structure, code)
      .pipe(map((users) => this.filterSelected(users)));
  }
}
