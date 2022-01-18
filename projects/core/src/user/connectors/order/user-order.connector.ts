import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsignmentTracking } from '../../../model/consignment-tracking.model';
import {
  CancellationRequestEntryInputList,
  Order,
  OrderHistoryList,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
} from '../../../model/order.model';
import { UserOrderAdapter } from './user-order.adapter';

/**
 * @deprecated since 4.2 - use OrderConnector in @spartacus/order/core
 */
@Injectable({
  providedIn: 'root',
})
export class UserOrderConnector {
  constructor(protected adapter: UserOrderAdapter) {}

  public get(userId: string, orderCode: string): Observable<Order> {
    return this.adapter.load(userId, orderCode);
  }

  public getHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    return this.adapter.loadHistory(userId, pageSize, currentPage, sort);
  }

  public getConsignmentTracking(
    orderCode: string,
    consignmentCode: string,
    userId?: string
  ): Observable<ConsignmentTracking> {
    return this.adapter.getConsignmentTracking(
      orderCode,
      consignmentCode,
      userId
    );
  }

  public cancel(
    userId: string,
    orderCode: string,
    cancelRequestInput: CancellationRequestEntryInputList
  ): Observable<{}> {
    return this.adapter.cancel(userId, orderCode, cancelRequestInput);
  }

  public return(
    userId: string,
    returnRequestInput: ReturnRequestEntryInputList
  ): Observable<ReturnRequest> {
    return this.adapter.createReturnRequest(userId, returnRequestInput);
  }

  public getReturnRequestDetail(
    userId: string,
    returnRequestCode: string
  ): Observable<ReturnRequest> {
    return this.adapter.loadReturnRequestDetail(userId, returnRequestCode);
  }

  public getReturnRequestList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ReturnRequestList> {
    return this.adapter.loadReturnRequestList(
      userId,
      pageSize,
      currentPage,
      sort
    );
  }

  public cancelReturnRequest(
    userId: string,
    returnRequestCode: string,
    returnRequestModification: ReturnRequestModification
  ): Observable<{}> {
    return this.adapter.cancelReturnRequest(
      userId,
      returnRequestCode,
      returnRequestModification
    );
  }
}
