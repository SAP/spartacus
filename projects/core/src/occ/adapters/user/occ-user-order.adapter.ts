import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';
import { FeatureConfigService } from '../../../features-config/services/feature-config.service';
import { Order, OrderHistoryList } from '../../../model/order.model';
import { ORDER_HISTORY_NORMALIZER } from '../../../user/connectors/order/converters';
import { UserOrderAdapter } from '../../../user/connectors/order/user-order.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccUserOrderAdapter implements UserOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected featureConfigService?: FeatureConfigService
  ) {}

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  protected getOrderEndpoint(userId: string): string {
    const orderEndpoint = 'users/' + userId + '/orders';
    return this.occEndpoints.getEndpoint(orderEndpoint);
  }

  public load(userId: string, orderCode: string): Observable<Order> {
    // TODO: Deprecated, remove Issue #4125
    if (!this.featureConfigService.isLevel('1.1')) {
      return this.legacyLoad(userId, orderCode);
    }

    const url = this.occEndpoints.getUrl('orderDetail', {
      userId,
      orderId: orderCode,
    });

    return this.http
      .get<Occ.Order>(url)
      .pipe(this.converter.pipeable(ORDER_NORMALIZER));
  }

  public loadHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    // TODO: Deprecated, remove Issue #4125
    if (!this.featureConfigService.isLevel('1.1')) {
      return this.legacyLoadHistory(userId, pageSize, currentPage, sort);
    }

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

    const url = this.occEndpoints.getUrl('orderHistory', { userId }, params);

    return this.http
      .get<Occ.OrderHistoryList>(url)
      .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  private legacyLoad(userId: string, orderCode: string): Observable<Order> {
    const url = this.getOrderEndpoint(userId) + '/' + orderCode;

    const params = new HttpParams({
      fromString: 'fields=FULL',
    });

    return this.http
      .get<Occ.Order>(url, {
        params,
      })
      .pipe(this.converter.pipeable(ORDER_NORMALIZER));
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  private legacyLoadHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    const url = this.getOrderEndpoint(userId);
    let params = new HttpParams();
    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('currentPage', currentPage.toString());
    }
    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http
      .get<Occ.OrderHistoryList>(url, { params: params })
      .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
  }
}
