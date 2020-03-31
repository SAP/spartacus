import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrgUnitAdapter } from './org-unit.adapter';
import {
  B2BUnitNode,
  B2BUnit,
  B2BApprovalProcess,
  B2BUser,
  B2BAddress,
} from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';
import { B2BSearchConfig } from '../../model/search-config';

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

  getList(userId: string): Observable<B2BUnitNode[]> {
    return this.adapter.loadList(userId);
  }

  getApprovalProcesses(userId: string): Observable<B2BApprovalProcess[]> {
    return this.adapter.loadApprovalProcesses(userId);
  }

  getTree(userId: string): Observable<B2BUnitNode> {
    return this.adapter.loadTree(userId);
  }

  getUsers(
    userId: string,
    orgUnitId: string,
    roleId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.adapter.loadUsers(userId, orgUnitId, roleId, params);
  }

  assignRole(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.adapter.assignRole(userId, orgUnitId, orgCustomerId, roleId);
  }

  unassignRole(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.adapter.unassignRole(userId, orgUnitId, orgCustomerId, roleId);
  }

  createAddress(
    userId: string,
    orgUnitId: string,
    address: B2BAddress
  ): Observable<B2BAddress> {
    return this.adapter.createAddress(userId, orgUnitId, address);
  }

  updateAddress(
    userId: string,
    orgUnitId: string,
    addressId: string,
    address: B2BAddress
  ): Observable<B2BAddress> {
    return this.adapter.updateAddress(userId, orgUnitId, addressId, address);
  }

  deleteAddress(
    userId: string,
    orgUnitId: string,
    addressId: string
  ): Observable<any> {
    return this.adapter.deleteAddress(userId, orgUnitId, addressId);
  }
}
