import { Injectable } from '@angular/core';
import {
  OrderReturnRequestService,
  RoutingService,
  ReturnRequest,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  shareReplay,
  tap,
  share,
} from 'rxjs/operators';
=======
import { Observable, combineLatest } from 'rxjs';
import { filter, map, tap, distinctUntilChanged } from 'rxjs/operators';
>>>>>>> feature/GH-5477

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
<<<<<<< HEAD
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['returnCode']),
      filter(Boolean),
      switchMap((returnCode: string) =>
        this.returnRequestService.getOrderReturnRequest(returnCode)
      ),
      filter(Boolean),
      shareReplay({ bufferSize: 1, refCount: true })
=======
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
      distinctUntilChanged()
>>>>>>> feature/GH-5477
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
