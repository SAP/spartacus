import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Address,
  ADDRESS_LIST_NORMALIZER,
  ADDRESS_SERIALIZER,
  B2BUnit,
  B2BUser,
  ConverterService,
  EntitiesModel,
  Occ,
  OccEndpointsService,
  SearchConfig,
  B2BApprovalProcess,
} from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
  B2BUNIT_NODE_LIST_NORMALIZER,
  B2BUNIT_NODE_NORMALIZER,
  B2BUNIT_NORMALIZER,
  B2B_USERS_NORMALIZER,
  OrgUnitAdapter,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';

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
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.http
      .get<Occ.OrgUnitUserList>(
        this.getUsersEndpoint(userId, orgUnitId, roleId, params)
      )
      .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
  }

  assignRole(
    userId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getRolesEndpoint(userId, orgCustomerId, { roleId }),
      null
    );
  }

  unassignRole(
    userId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getRoleEndpoint(userId, orgCustomerId, roleId)
    );
  }

  assignApprover(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.http.post<any>(
      this.getApproversEndpoint(userId, orgUnitId, orgCustomerId, { roleId }),
      null
    );
  }

  unassignApprover(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getApproverEndpoint(userId, orgUnitId, orgCustomerId, roleId)
    );
  }

  loadAddresses(
    userId: string,
    orgUnitId: string
  ): Observable<EntitiesModel<Address>> {
    return this.http
      .get<Occ.AddressList>(this.getAddressesEndpoint(userId, orgUnitId))
      .pipe(this.converter.pipeable(ADDRESS_LIST_NORMALIZER));
  }

  createAddress(
    userId: string,
    orgUnitId: string,
    address: Address
  ): Observable<Address> {
    return this.http
      .post<Occ.Address>(this.getAddressesEndpoint(userId, orgUnitId), address)
      .pipe(this.converter.pipeable(ADDRESS_SERIALIZER));
  }

  updateAddress(
    userId: string,
    orgUnitId: string,
    addressId: string,
    address: Address
  ): Observable<Address> {
    return this.http
      .patch<Occ.Address>(
        this.getAddressEndpoint(userId, orgUnitId, addressId),
        address
      )
      .pipe(this.converter.pipeable(ADDRESS_SERIALIZER));
  }

  deleteAddress(
    userId: string,
    orgUnitId: string,
    addressId: string
  ): Observable<any> {
    return this.http
      .delete<Occ.Address>(
        this.getAddressEndpoint(userId, orgUnitId, addressId)
      )
      .pipe(this.converter.pipeable(ADDRESS_SERIALIZER));
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
    params?: SearchConfig
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
    orgCustomerId: string,
    params: { roleId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'orgUnitUserRoles',
      { userId, orgCustomerId },
      params
    );
  }

  protected getRoleEndpoint(
    userId: string,
    orgCustomerId: string,
    roleId: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitUserRole', {
      userId,
      orgCustomerId,
      roleId,
    });
  }

  protected getApproversEndpoint(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    params: { roleId: string }
  ): string {
    return this.occEndpoints.getUrl(
      'orgUnitApprovers',
      { userId, orgUnitId, orgCustomerId },
      params
    );
  }

  protected getApproverEndpoint(
    userId: string,
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitApprover', {
      userId,
      orgUnitId,
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
