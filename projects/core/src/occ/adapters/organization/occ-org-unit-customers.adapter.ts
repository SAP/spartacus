import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { B2BSearchConfig } from '../../../organization/model/search-config';
import { Occ } from '../../occ-models/occ.models';
import {
  OrgUnitCustomerAdapter,
  ORG_UNIT_CUSTOMER_NORMALIZER,
  ORG_UNIT_CUSTOMERS_NORMALIZER,
} from '../../../organization/connectors/org-unit-customer';
import { OrgUnitCustomer, EntitiesModel } from '../../../model';

@Injectable()
export class OccOrgUnitCustomerAdapter implements OrgUnitCustomerAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, orgUnitCustomerId: string): Observable<OrgUnitCustomer> {
    return this.http
      .get<Occ.OrgUnitCustomer>(
        this.getOrgUnitCustomerEndpoint(userId, orgUnitCustomerId)
      )
      .pipe(this.converter.pipeable(ORG_UNIT_CUSTOMER_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitCustomer>> {
    return this.http
      .get<Occ.OrgUnitCustomerList>(
        this.getOrgUnitCustomersEndpoint(userId, params)
      )
      .pipe(this.converter.pipeable(ORG_UNIT_CUSTOMERS_NORMALIZER));
  }

  protected getOrgUnitCustomerEndpoint(
    userId: string,
    orgUnitCustomerId: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitCustomer', {
      userId,
      orgUnitCustomerId,
    });
  }

  protected getOrgUnitCustomersEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('orgUnitCustomers', { userId }, params);
  }
}
