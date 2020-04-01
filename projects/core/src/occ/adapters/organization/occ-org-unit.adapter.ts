import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import {
  B2BUNIT_NODE_NORMALIZER,
  B2BUNIT_NODE_LIST_NORMALIZER,
  B2BUNIT_NORMALIZER,
  B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
  B2B_ADDRESS_NORMALIZER,
} from '../../../organization/connectors/org-unit/converters';
import { B2B_USERS_NORMALIZER } from '../../../organization/connectors/b2b-user/converters';
import { OrgUnitAdapter } from '../../../organization/connectors/org-unit/org-unit.adapter';
import { Occ } from '../../occ-models/occ.models';
import {
  B2BUnitNode,
  B2BUnit,
  B2BApprovalProcess,
  B2BUser,
  B2BAddress,
} from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';
import { B2BSearchConfig } from '../../../organization/model/search-config';

const APPROVER = 'b2bapprovergroup';

@Injectable()
export class OccOrgUnitAdapter implements OrgUnitAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, orgUnitId: string): Observable<B2BUnit> {
    return this.http
      .get<Occ.B2BUnit>(this.getOrgUnitEndpoint(userId, orgUnitId))
      .pipe(this.converter.pipeable(B2BUNIT_NORMALIZER));
  }

  create(userId: string, orgUnit: B2BUnit): Observable<B2BUnit> {
    return this.http
      .post<Occ.B2BUnit>(this.getOrgUnitsEndpoint(userId), orgUnit)
      .pipe(this.converter.pipeable(B2BUNIT_NORMALIZER));
  }

  update(
    userId: string,
    orgUnitId: string,
    orgUnit: B2BUnit
  ): Observable<B2BUnit> {
    return this.http
      .patch<Occ.B2BUnit>(this.getOrgUnitEndpoint(userId, orgUnitId), orgUnit)
      .pipe(this.converter.pipeable(B2BUNIT_NORMALIZER));
  }

  loadTree(userId: string): Observable<B2BUnitNode> {
    return this.http
      .get<Occ.B2BUnitNode>(this.getOrgUnitsTreeEndpoint(userId))
      .pipe(this.converter.pipeable(B2BUNIT_NODE_NORMALIZER));
  }

  loadList(userId: string): Observable<B2BUnitNode[]> {
    return this.http
      .get<Occ.B2BUnitNodeList>(this.getAvailableOrgUnitsEndpoint(userId))
      .pipe(this.converter.pipeable(B2BUNIT_NODE_LIST_NORMALIZER));
  }

  loadApprovalProcesses(userId: string): Observable<B2BApprovalProcess[]> {
    return this.http
      .get<Occ.B2BApprovalProcessList>(
        this.getOrgUnitsApprovalProcessesEndpoint(userId)
      )
      .pipe(this.converter.pipeable(B2BUNIT_APPROVAL_PROCESSES_NORMALIZER));
  }

  loadUsers(
    userId: string,
    orgUnitId: string,
    roleId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.http
      .get<Occ.OrgUnitUserList>(
        this.getUsersEndpoint(userId, orgUnitId, roleId, params)
      )
      .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
  }

  assignRole(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.http.post<any>(
      roleId === APPROVER
        ? this.getApproversEndpoint(userId, orgUnitId, { roleId })
        : this.getRolesEndpoint(userId, orgUnitId, orgCustomerId, { roleId }),
      null
    );
  }

  unassignRole(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.http.delete<any>(
      roleId === APPROVER
        ? this.getApproverEndpoint(userId, orgCustomerId, roleId)
        : this.getRoleEndpoint(userId, orgUnitId, orgCustomerId, roleId)
    );
  }

  loadAddresses(userId: string, orgUnitId: string): Observable<B2BAddress[]> {
    return this.http
      .get<Occ.B2BAddress[]>(this.getAddressesEndpoint(userId, orgUnitId))
      .pipe(this.converter.pipeableMany(B2B_ADDRESS_NORMALIZER));
  }

  createAddress(
    userId: string,
    orgUnitId: string,
    address: B2BAddress
  ): Observable<B2BAddress> {
    return this.http
      .post<Occ.B2BAddress>(
        this.getAddressesEndpoint(userId, orgUnitId),
        address
      )
      .pipe(this.converter.pipeable(B2B_ADDRESS_NORMALIZER));
  }

  updateAddress(
    userId: string,
    orgUnitId: string,
    addressId: string,
    address: B2BAddress
  ): Observable<B2BAddress> {
    return this.http
      .patch<Occ.B2BAddress>(
        this.getAddressEndpoint(userId, orgUnitId, addressId),
        address
      )
      .pipe(this.converter.pipeable(B2B_ADDRESS_NORMALIZER));
  }

  deleteAddress(
    userId: string,
    orgUnitId: string,
    addressId: string
  ): Observable<any> {
    return this.http
      .delete<Occ.B2BAddress>(
        this.getAddressEndpoint(userId, orgUnitId, addressId)
      )
      .pipe(this.converter.pipeable(B2B_ADDRESS_NORMALIZER));
  }

  protected getOrgUnitEndpoint(userId: string, orgUnitId: string): string {
    return this.occEndpoints.getUrl('orgUnit', { userId, orgUnitId });
  }

  protected getOrgUnitsEndpoint(userId: string): string {
    return this.occEndpoints.getUrl('orgUnits', { userId });
  }

  protected getAvailableOrgUnitsEndpoint(userId: string): string {
    return this.occEndpoints.getUrl('orgUnitsAvailable', { userId });
  }

  protected getOrgUnitsTreeEndpoint(userId: string): string {
    return this.occEndpoints.getUrl('orgUnitsTree', { userId });
  }

  protected getOrgUnitsApprovalProcessesEndpoint(userId: string): string {
    return this.occEndpoints.getUrl('orgUnitsApprovalProcesses', { userId });
  }

  protected getUsersEndpoint(
    userId: string,
    orgUnitId: string,
    roleId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl(
      'orgUnitUsers',
      {
        userId,
        orgUnitId,
        roleId,
      },
      params
    );
  }

  protected getRolesEndpoint(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    params: { roleId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'orgUnitUserRoles',
      { userId, orgUnitId, orgCustomerId },
      params
    );
  }

  protected getRoleEndpoint(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitUserRole', {
      userId,
      orgUnitId,
      orgCustomerId,
      roleId,
    });
  }

  protected getApproversEndpoint(
    userId: string,
    orgCustomerId: string,
    params: { roleId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'orgUnitApprovers',
      { userId, orgCustomerId },
      params
    );
  }

  protected getApproverEndpoint(
    userId: string,
    orgCustomerId: string,
    roleId: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitApprover', {
      userId,
      orgCustomerId,
      roleId,
    });
  }

  protected getAddressesEndpoint(userId: string, orgUnitId: string): string {
    return this.occEndpoints.getUrl('orgUnitsAddresses', { userId, orgUnitId });
  }

  protected getAddressEndpoint(
    userId: string,
    orgUnitId: string,
    addressId: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitsAddress', {
      userId,
      orgUnitId,
      addressId,
    });
  }
}
