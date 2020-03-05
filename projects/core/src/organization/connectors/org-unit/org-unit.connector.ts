import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrgUnitAdapter } from './org-unit.adapter';
import {
  B2BUnitNode,
  B2BUnit,
  B2BApprovalProcess,
} from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';
import { Occ } from '../../../occ/occ-models/occ.models';
import {
  B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
  B2BUNIT_NODE_NORMALIZER,
} from './converters';

@Injectable({
  providedIn: 'root',
})
export class OrgUnitConnector {
  constructor(protected adapter: OrgUnitAdapter) {}

  get(userId: string, orgUnitId: string): Observable<B2BUnit> {
    return this.adapter.load(userId, orgUnitId);
  }

  create(userId: string, orgUnit: B2BUnit): Observable<B2BUnit> {
    return this.adapter.create(userId, orgUnit);
  }

  update(
    userId: string,
    orgUnitId: string,
    orgUnit: B2BUnit
  ): Observable<B2BUnit> {
    return this.adapter.update(userId, orgUnitId, orgUnit);
  }

  getList(
    userId: string,
    params?: any
  ): Observable<EntitiesModel<B2BUnitNode>> {
    return this.adapter.loadList(userId, params);
  }

  getApprovalProcesses(userId: string): Observable<B2BApprovalProcess> {
    return this.adapter.loadApprovalProcesses(userId);
  }

  getTree(userId: string, params?: any): Observable<B2BUnitNode> {
    return this.adapter.loadTree(userId, params);
  }
}
