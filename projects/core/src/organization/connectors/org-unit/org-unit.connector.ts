import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrgUnitAdapter } from './org-unit.adapter';
import {
  B2BUnitNode,
  B2BUnit,
  B2BApprovalProcess,
  B2BUser,
} from '../../../model/org-unit.model';
import { EntitiesModel } from 'projects/core/src/model/misc.model';

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

  getList(userId: string, params?: any): Observable<B2BUnitNode[]> {
    return this.adapter.loadList(userId, params);
  }

  getApprovalProcesses(userId: string): Observable<B2BApprovalProcess[]> {
    return this.adapter.loadApprovalProcesses(userId);
  }

  getTree(userId: string, params?: any): Observable<B2BUnitNode> {
    return this.adapter.loadTree(userId, params);
  }

  getUsers(
    userId: string,
    orgUnitId: string,
    roleId: string,
    params?: any
  ): Observable<EntitiesModel<B2BUser>> {
    return this.adapter.loadUsers(userId, orgUnitId, roleId, params);
  }
}
