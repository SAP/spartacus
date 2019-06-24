import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';
import { ConsignmentTracking } from '../../../model/consignment-tracking.model';
import { Order, OrderHistoryList } from '../../../model/order.model';
import { ORDER_HISTORY_NORMALIZER } from '../../../user/connectors/order/converters';
import { UserOrderAdapter } from '../../../user/connectors/order/user-order.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

// To be changed to a more optimised params after ticket: C3PO-1076
const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccUserOrderAdapter implements UserOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getOrderEndpoint(userId: string): string {
    const orderEndpoint = 'users/' + userId + '/orders';
    return this.occEndpoints.getEndpoint(orderEndpoint);
  }

  protected getConsignmentTrackingEndpoint(
    orderCode: string,
    consignmentCode: string
  ): string {
    const endpoint =
      '/orders/' + orderCode + '/consignments/' + consignmentCode + '/tracking';
    return this.occEndpoints.getEndpoint(endpoint);
  }

  public load(userId: string, orderCode: string): Observable<Order> {
    const url = this.getOrderEndpoint(userId);

    const orderUrl = url + '/' + orderCode;

    const params = new HttpParams({
      fromString: FULL_PARAMS,
    });

    return this.http
      .get<Occ.Order>(orderUrl, {
        params: params,
      })
      .pipe(this.converter.pipeable(ORDER_NORMALIZER));
  }

  public loadHistory(
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

  public getConsignmentTracking(
    orderCode: string,
    consignmentCode: string
  ): Observable<ConsignmentTracking> {
    return this.http
      .get<ConsignmentTracking>(
        this.getConsignmentTrackingEndpoint(orderCode, consignmentCode)
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
