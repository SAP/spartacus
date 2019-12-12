import { Injectable } from '@angular/core';
import {
  OrderReturnRequestService,
  RoutingService,
  ReturnRequest,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, tap, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReturnRequestService {
  constructor(
    private routingService: RoutingService,
    private returnRequestService: OrderReturnRequestService
  ) {}

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
      distinctUntilChanged()
    );
  }

  clearReturnRequest(): void {
    this.returnRequestService.clearOrderReturnRequestDetail();
  }
}
