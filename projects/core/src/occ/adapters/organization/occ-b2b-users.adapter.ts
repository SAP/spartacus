import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { B2BSearchConfig } from '../../../organization/model/search-config';
import { Occ } from '../../occ-models/occ.models';
import {
  B2BUserAdapter,
  B2B_USER_NORMALIZER,
  B2B_USERS_NORMALIZER,
} from '../../../organization/connectors/b2b-user';
import { EntitiesModel } from '../../../model/misc.model';
import { B2BUser } from '../../../model/org-unit.model';

@Injectable()
export class OccB2BUserAdapter implements B2BUserAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, orgUnitCustomerId: string): Observable<B2BUser> {
    return this.http
      .get<Occ.B2BUser>(this.getB2BUserEndpoint(userId, orgUnitCustomerId))
      .pipe(this.converter.pipeable(B2B_USER_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.http
      .get<Occ.B2BUserList>(this.getB2BUsersEndpoint(userId, params))
      .pipe(this.converter.pipeable(B2B_USERS_NORMALIZER));
  }

  protected getB2BUserEndpoint(
    userId: string,
    orgUnitCustomerId: string
  ): string {
    return this.occEndpoints.getUrl('orgUnitCustomer', {
      userId,
      orgUnitCustomerId,
    });
  }

  protected getB2BUsersEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('b2bUsers', { userId }, params);
  }
}
