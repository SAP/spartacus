import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CostCenterAdapter } from '../../../organization/connectors/cost-center/cost-center.adapter';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import {
  COST_CENTER_NORMALIZER,
  COST_CENTERS_NORMALIZER,
} from '../../../organization/connectors/cost-center/converters';
import { B2BSearchConfig } from '../../../organization/model/search-config';
import { Occ } from '../../occ-models/occ.models';
import { CostCenter } from '../../../model/cost-center.model';
import { EntitiesModel } from '../../../model/misc.model';

@Injectable()
export class OccCostCenterAdapter implements CostCenterAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, costCenterCode: string): Observable<CostCenter> {
    return this.http
      .get<Occ.CostCenter>(this.getCostCenterEndpoint(userId, costCenterCode))
      .pipe(this.converter.pipeable(COST_CENTER_NORMALIZER));
  }

  loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<CostCenter>> {
    return this.http
      .get<Occ.CostCentersList>(this.getCostCentersEndpoint(userId, params))
      .pipe(this.converter.pipeable(COST_CENTERS_NORMALIZER));
  }

  create(userId: string, costCenter: CostCenter): Observable<CostCenter> {
    return this.http
      .post<CostCenter>(this.getCostCentersEndpoint(userId), costCenter)
      .pipe(this.converter.pipeable(COST_CENTER_NORMALIZER));
  }

  update(
    userId: string,
    costCenterCode: string,
    costCenter: CostCenter
  ): Observable<CostCenter> {
    return this.http
      .patch<CostCenter>(
        this.getCostCenterEndpoint(userId, costCenterCode),
        costCenter
      )
      .pipe(this.converter.pipeable(COST_CENTER_NORMALIZER));
  }

  protected getCostCenterEndpoint(
    userId: string,
    costCenterCode: string
  ): string {
    return this.occEndpoints.getUrl('costCenter', { userId, costCenterCode });
  }

  protected getCostCentersEndpoint(
    userId: string,
    params?: B2BSearchConfig
  ): string {
    return this.occEndpoints.getUrl('costCenters', { userId }, params);
  }
}
