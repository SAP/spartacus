import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { UserReplenishmentOrderAdapter } from '../../../user/connectors/replenishment-order/user-replenishment-order.adapter';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { REPLENISHMENT_ORDER_HISTORY_NORMALIZER } from 'projects/core/src/user/connectors/replenishment-order/converters';

@Injectable()
export class OccUserReplenishmentOrderAdapter implements UserReplenishmentOrderAdapter { 
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService

  ) {}


  public loadHistory(
      userId: string,
      pageSize ?: number,
      currentPage ?: number,
      sort ?: string
    ): Observable<ReplenishmentOrderList> {
      const params = {};
      if(pageSize) {
          params['pageSize'] = pageSize.toString();
      }
    if(currentPage) {
          params['currentPage'] = currentPage.toString();
      }
    if(sort) {
          params['sort'] = sort.toString();
      }

    const url = this.occEndpoints.getUrl('replenishmentOrderHistory', { userId }, params);

      return this.http
          .get<Occ.ReplenishmentOrderList>(url)
        .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_HISTORY_NORMALIZER));
  }

}