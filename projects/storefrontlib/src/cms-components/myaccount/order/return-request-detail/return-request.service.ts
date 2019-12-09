import { Injectable } from '@angular/core';
import {
  OrderReturnRequestService,
  RoutingService,
  ReturnRequest,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  shareReplay,
  tap,
  share,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReturnRequestService {
  constructor(
    protected routingService: RoutingService,
    protected returnRequestService: OrderReturnRequestService,
    protected globalMessageService: GlobalMessageService
  ) {}

  getReturnRequest(): Observable<ReturnRequest> {
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['returnCode']),
      filter(Boolean),
      switchMap((returnCode: string) =>
        this.returnRequestService.getOrderReturnRequest(returnCode)
      ),
      filter(returnRequest => Boolean(returnRequest.returnEntries)),
      shareReplay({ bufferSize: 1, refCount: true })
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

  get isCancelling$(): Observable<boolean> {
    return this.returnRequestService.getReturnRequestState().pipe(
      tap(state => {
        if (state.success && !state.loading) {
          this.globalMessageService.add(
            {
              key: 'returnRequest.cancelSuccess',
              params: { rma: state.value.rma },
            },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
          this.routingService.go({
            cxRoute: 'orders',
          });
        }
      }),
      map(state => state.loading),
      share()
    );
  }
}
