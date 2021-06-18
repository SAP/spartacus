import { Injectable } from '@angular/core';
import {
  OrderReturnRequestService,
  RoutingService,
  ReturnRequest,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, tap, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReturnRequestService {
  constructor(
    protected routingService: RoutingService,
    protected returnRequestService: OrderReturnRequestService,
    protected globalMessageService: GlobalMessageService
  ) {}

  get isCancelling$(): Observable<boolean> {
    return this.returnRequestService.getCancelReturnRequestLoading();
  }

  get isCancelSuccess$(): Observable<boolean> {
    return this.returnRequestService.getCancelReturnRequestSuccess();
  }

  getReturnRequest(): Observable<ReturnRequest> {
    return combineLatest([
      this.routingService.getRouterState(),
      this.returnRequestService.getOrderReturnRequest(),
      this.returnRequestService.getReturnRequestLoading(),
    ]).pipe(
      map(([routingState, returnRequest, isLoading]) => [
        routingState.state.params['returnCode'],
        returnRequest,
        isLoading,
      ]),
      filter(([returnCode]) => Boolean(returnCode)),
      tap(([returnCode, returnRequest, isLoading]) => {
        if (
          (returnRequest === undefined || returnRequest.rma !== returnCode) &&
          !isLoading
        ) {
          this.returnRequestService.loadOrderReturnRequestDetail(returnCode);
        }
      }),
      map(([_, returnRequest]) => returnRequest),
      filter(Boolean),
      distinctUntilChanged()
    );
  }

  clearReturnRequest(): void {
    this.returnRequestService.clearOrderReturnRequestDetail();
  }

  cancelReturnRequest(returnRequestCode: string): void {
    this.returnRequestService.cancelOrderReturnRequest(returnRequestCode, {
      status: 'CANCELLING',
    });
  }

  cancelSuccess(rma: string): void {
    this.returnRequestService.resetCancelReturnRequestProcessState();
    this.globalMessageService.add(
      {
        key: 'returnRequest.cancelSuccess',
        params: { rma },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routingService.go({
      cxRoute: 'orders',
    });
  }

  backToList(): void {
    this.routingService.go(
      { cxRoute: 'orders' },
      {
        state: {
          activeTab: 1,
        },
      }
    );
  }
}
