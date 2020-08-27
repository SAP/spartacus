import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REPLENISHMENT_ORDER_NORMALIZER } from '../../../checkout/connectors/replenishment-order/converters';
import { OrderHistoryList, ReplenishmentOrder } from '../../../model/index';
import { ORDER_HISTORY_NORMALIZER } from '../../../user/connectors/order/converters';
import { UserReplenishmentOrderAdapter } from '../../../user/connectors/replenishment-order/user-replenishment-order.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccUserReplenishmentOrderAdapter
  implements UserReplenishmentOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  public load(
    userId: string,
    replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return this.http
      .get<Occ.ReplenishmentOrder>(
        this.occEndpoints.getUrl('replenishmentOrderDetails', {
          userId,
          replenishmentOrderCode,
        })
      )
      .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_NORMALIZER));
  }

  public loadReplenishmentDetailsHistory(
    userId: string,
    replenishmentOrderCode: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    const params = {};

    if (pageSize) {
      params['pageSize'] = pageSize.toString();
    }
    if (currentPage) {
      params['currentPage'] = currentPage.toString();
    }
    if (sort) {
      params['sort'] = sort.toString();
    }

    return this.http
      .get<Occ.OrderHistoryList>(
        this.occEndpoints.getUrl(
          'replenishmentOrderDetailsHistory',
          {
            userId,
            replenishmentOrderCode,
          },
          params
        )
      )
      .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
  }

  public cancelReplenishmentOrder(
    userId: string,
    replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .patch<Occ.ReplenishmentOrder>(
        this.occEndpoints.getUrl('cancelReplenishmentOrder', {
          userId,
          replenishmentOrderCode,
        }),
        {},
        { headers }
      )
      .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_NORMALIZER));
  }
}
