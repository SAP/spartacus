import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  ReturnRequest,
  RoutingService,
} from '@spartacus/core';
import { OrderReturnRequestFacade } from '@spartacus/order/root';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReturnRequestService {
  constructor(
    protected routingService: RoutingService,
    protected returnRequestService: OrderReturnRequestFacade,
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
      filter((returnRequest) => Boolean(returnRequest)),
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
