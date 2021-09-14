import { Injectable } from '@angular/core';
import {
  CancellationRequestEntryInputList,
  Order,
  OrderHistoryList,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
} from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderAdapter } from './order.adapter';

@Injectable()
export class OrderConnector {
  constructor(protected adapter: OrderAdapter) {}

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
