import { Injectable } from '@angular/core';
import {
  OrderReturnRequestService,
  RoutingService,
  ReturnRequest,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReturnRequestService {
  constructor(
    private routingService: RoutingService,
    private returnRequestService: OrderReturnRequestService
  ) {}

  getReturnRequest(): Observable<ReturnRequest> {
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['returnCode']),
      filter(Boolean),
      switchMap((returnCode: string) =>
        this.returnRequestService.getOrderReturnRequest(returnCode)
      ),
      filter(returnRequest => Boolean(returnRequest.returnEntries))
    );
  }

  clearReturnRequest(): void {
    this.returnRequestService.clearOrderReturnRequestDetail();
  }
}
