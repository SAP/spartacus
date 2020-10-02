import { Injectable } from '@angular/core';
import {
  Address,
  B2BApprovalProcess,
  B2BUnit,
  B2BUser,
  EntitiesModel,
  SearchConfig,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { B2BUnitNode } from '../../model/unit-node.model';
import { OrgUnitAdapter } from './org-unit.adapter';

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
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.adapter.loadUsers(userId, orgUnitId, roleId, params);
  }

  assignRole(
    userId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.adapter.assignRole(userId, orgCustomerId, roleId);
  }

  unassignRole(
    userId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.adapter.unassignRole(userId, orgCustomerId, roleId);
  }

  assignApprover(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.adapter.assignApprover(
      userId,
      orgUnitId,
      orgCustomerId,
      roleId
    );
  }

  unassignApprover(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.adapter.unassignApprover(
      userId,
      orgUnitId,
      orgCustomerId,
      roleId
    );
  }

  getAddresses(
    userId: string,
    orgUnitId: string
  ): Observable<EntitiesModel<Address>> {
    return this.adapter.loadAddresses(userId, orgUnitId);
  }

  createAddress(
    userId: string,
    orgUnitId: string,
    address: Address
  ): Observable<Address> {
    return this.adapter.createAddress(userId, orgUnitId, address);
  }

  updateAddress(
    userId: string,
    orgUnitId: string,
    addressId: string,
    address: Address
  ): Observable<Address> {
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
