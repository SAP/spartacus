import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COST_CENTERS_NORMALIZER } from '../../../cost-center/connectors/cost-center/converters';
import { EntitiesModel } from '../../../model/misc.model';
import { CostCenter } from '../../../model/org-unit.model';
import { SearchConfig } from '../../../product/model/search-config';
import { UserCostCenterAdapter } from '../../../user/connectors/cost-center/user-cost-center.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccUserCostCenterAdapter implements UserCostCenterAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadActiveList(userId: string): Observable<EntitiesModel<CostCenter>> {
    return this.http
      .get<Occ.CostCentersList>(this.getCostCentersEndpoint(userId))
      .pipe(this.converter.pipeable(COST_CENTERS_NORMALIZER));
  }

  protected getCostCentersEndpoint(
    userId: string,
    params?: SearchConfig
  ): string {
    return this.occEndpoints.buildUrl('getActiveCostCenters', {
      urlParams: { userId },
      queryParams: params,
    });
  }
}
