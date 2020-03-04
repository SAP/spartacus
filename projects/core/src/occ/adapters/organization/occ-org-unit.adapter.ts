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
} from '../../../organization/connectors/org-unit/converters';
import { OrgUnitAdapter } from '../../../organization/connectors/org-unit/org-unit.adapter';
import { Occ } from '../../occ-models/occ.models';
import {
  B2BUnitNode,
  B2BUnit,
  B2BApprovalProcess,
} from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';

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

  loadTree(userId: string, params?: any): Observable<B2BUnit> {
    return this.http
      .get<Occ.B2BUnit>(this.getOrgUnitsTreeEndpoint(userId, params))
      .pipe(this.converter.pipeable(B2BUNIT_NODE_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: any
  ): Observable<EntitiesModel<B2BUnitNode>> {
    return this.http
      .get<Occ.B2BUnitNodeList>(
        this.getAvailableOrgUnitsEndpoint(userId, params)
      )
      .pipe(this.converter.pipeable(B2BUNIT_NODE_LIST_NORMALIZER));
  }

  loadApprovalProcesses(userId: string): Observable<B2BApprovalProcess> {
    return this.http
      .get<Occ.B2BApprovalProcess>(
        this.getOrgUnitsApprovalProcessesEndpoint(userId)
      )
      .pipe(this.converter.pipeable(B2BUNIT_APPROVAL_PROCESSES_NORMALIZER));
  }

  protected getOrgUnitEndpoint(userId: string, orgUnitId: string): string {
    return this.occEndpoints.getUrl('orgUnit', { userId, orgUnitId });
  }

  protected getOrgUnitsEndpoint(userId: string, params?: any): string {
    return this.occEndpoints.getUrl('orgUnits', { userId }, params);
  }

  protected getAvailableOrgUnitsEndpoint(userId: string, params?: any): string {
    return this.occEndpoints.getUrl('orgUnitsAvailable', { userId }, params);
  }

  protected getOrgUnitsTreeEndpoint(userId: string, params?: any): string {
    return this.occEndpoints.getUrl('orgUnitsTree', { userId }, params);
  }

  protected getOrgUnitsApprovalProcessesEndpoint(userId: string): string {
    return this.occEndpoints.getUrl('orgUnitsApprovalProcesses', { userId });
  }
}
