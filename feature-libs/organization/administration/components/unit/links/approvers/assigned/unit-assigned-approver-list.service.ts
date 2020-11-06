import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../../shared/index';
import { UnitApproverListService } from '../unit-approver-list.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnitAssignedApproverListService extends UnitApproverListService {
  protected tableType = OrganizationTableType.UNIT_ASSIGNED_APPROVERS;

  protected load(
    _pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.unitService.getApprovers(code).pipe(
      map((wrapper) => {
        return {
          // forcing to override `selected` prop in objects coming from backend to avoid breaking UI
          // this is dictated by change of information source from store to specific entity object
          values: wrapper.values.map((approver) => {
            return { ...approver, selected: true };
          }),
        };
      })
    );
  }
}
