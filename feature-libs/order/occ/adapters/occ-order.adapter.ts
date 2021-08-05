import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CancellationRequestEntryInputList,
  ConsignmentTracking,
  ConverterService,
  InterceptorUtil,
  Occ,
  OccEndpointsService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  Order,
  OrderHistoryList,
  ORDER_NORMALIZER,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import {
  CONSIGNMENT_TRACKING_NORMALIZER,
  OrderAdapter,
  ORDER_HISTORY_NORMALIZER,
  ORDER_RETURNS_NORMALIZER,
  ORDER_RETURN_REQUEST_INPUT_SERIALIZER,
  ORDER_RETURN_REQUEST_NORMALIZER,
} from '@spartacus/order/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccOrderAdapter implements OrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  public load(userId: string, orderCode: string): Observable<Order> {
    const url = this.occEndpoints.buildUrl('orderDetail', {
      urlParams: { userId, orderId: orderCode },
    });

    let headers = new HttpHeaders();
    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    return this.http
      .get<Occ.Order>(url, { headers })
      .pipe(this.converter.pipeable(ORDER_NORMALIZER));
  }

  public loadHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    const params: { [key: string]: string } = {};
    if (pageSize) {
      params['pageSize'] = pageSize.toString();
    }
    if (currentPage) {
      params['currentPage'] = currentPage.toString();
    }
    if (sort) {
      params['sort'] = sort.toString();
    }

    const url = this.occEndpoints.buildUrl('orderHistory', {
      urlParams: { userId },
      queryParams: params,
    });

    return this.http
      .get<Occ.OrderHistoryList>(url)
      .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
  }

  public getConsignmentTracking(
    orderCode: string,
    consignmentCode: string,
    userId: string = OCC_USER_ID_CURRENT
  ): Observable<ConsignmentTracking> {
    const url = this.occEndpoints.buildUrl('consignmentTracking', {
      urlParams: { userId, orderCode, consignmentCode },
    });
    return this.http
      .get<ConsignmentTracking>(url)
      .pipe(this.converter.pipeable(CONSIGNMENT_TRACKING_NORMALIZER));
  }

  public cancel(
    userId: string,
    orderCode: string,
    cancelRequestInput: CancellationRequestEntryInputList
  ): Observable<{}> {
    const url = this.occEndpoints.buildUrl('cancelOrder', {
      urlParams: { userId, orderId: orderCode },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(url, cancelRequestInput, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  public createReturnRequest(
    userId: string,
    returnRequestInput: ReturnRequestEntryInputList
  ): Observable<ReturnRequest> {
    const url = this.occEndpoints.buildUrl('returnOrder', {
      urlParams: { userId },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    returnRequestInput = this.converter.convert(
      returnRequestInput,
      ORDER_RETURN_REQUEST_INPUT_SERIALIZER
    );

    return this.http.post(url, returnRequestInput, { headers }).pipe(
      catchError((error: any) => throwError(error)),
      this.converter.pipeable(ORDER_RETURN_REQUEST_NORMALIZER)
    );
  }

  public loadReturnRequestList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ReturnRequestList> {
    const params: { [key: string]: string } = {};
    if (pageSize) {
      params['pageSize'] = pageSize.toString();
    }
    if (currentPage) {
      params['currentPage'] = currentPage.toString();
    }
    if (sort) {
      params['sort'] = sort.toString();
    }

    const url = this.occEndpoints.buildUrl('orderReturns', {
      urlParams: { userId },
      queryParams: params,
    });

    return this.http
      .get<ReturnRequestList>(url)
      .pipe(this.converter.pipeable(ORDER_RETURNS_NORMALIZER));
  }

  public loadReturnRequestDetail(
    userId: string,
    returnRequestCode: string
  ): Observable<ReturnRequest> {
    const url = this.occEndpoints.buildUrl('orderReturnDetail', {
      urlParams: { userId, returnRequestCode },
    });

    return this.http
      .get<ReturnRequest>(url)
      .pipe(this.converter.pipeable(ORDER_RETURN_REQUEST_NORMALIZER));
  }

  public cancelReturnRequest(
    userId: string,
    returnRequestCode: string,
    returnRequestModification: ReturnRequestModification
  ): Observable<{}> {
    const url = this.occEndpoints.buildUrl('cancelReturn', {
      urlParams: { userId, returnRequestCode },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .patch(url, returnRequestModification, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
