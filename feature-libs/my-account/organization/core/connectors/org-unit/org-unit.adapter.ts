import { Observable } from 'rxjs';
import {
  B2BUnitNode,
  B2BUnit,
  B2BApprovalProcess,
  B2BUser,
  B2BAddress,
  EntitiesModel,
} from '@spartacus/core';
import { B2BSearchConfig } from '../../model/search-config';

export abstract class OrgUnitAdapter {
  /**
   * Abstract method used to load orgUnit's details data.
   * B2BUnitNode's data can be loaded from alternative sources, as long as the structure
   * converts to the `B2BUnitNode`.
   *
   * @param userId The `userId` for given orgUnit
   * @param orgUnitId The `orgUnitId` for given orgUnit
   */
  abstract load(userId: string, orgUnitId: string): Observable<B2BUnit>;

  abstract loadList(userId: string): Observable<B2BUnitNode[]>;

  abstract create(userId: string, orgUnit: B2BUnit): Observable<B2BUnit>;

  abstract update(
    userId: string,
    orgUnitId: string,
    orgUnit: B2BUnit
  ): Observable<B2BUnit>;

  abstract loadApprovalProcesses(
    userId: string
  ): Observable<B2BApprovalProcess[]>;

  abstract loadTree(userId: string): Observable<B2BUnitNode>;

  abstract loadUsers(
    userId: string,
    orgUnitId: string,
    roleId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>>;

  abstract assignRole(
    userId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any>;

  abstract unassignRole(
    userId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any>;

  abstract assignApprover(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any>;

  abstract unassignApprover(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any>;

  abstract loadAddresses(
    userId: string,
    orgUnitId: string
  ): Observable<EntitiesModel<B2BAddress>>;

  abstract createAddress(
    userId: string,
    orgUnitId: string,
    address: B2BAddress
  ): Observable<B2BAddress>;

  abstract updateAddress(
    userId: string,
    orgUnitId: string,
    addressId: string,
    address: B2BAddress
  ): Observable<B2BAddress>;

  abstract deleteAddress(
    userId: string,
    orgUnitId: string,
    addressId: string
  ): Observable<any>;
}
