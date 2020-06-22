import { Injectable } from '@angular/core';
import { Order, OrderApprovalService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, pluck, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderApprovalDetailService {
  approvalCode$ = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params.approvalCode));

  orderApprovalData$ = this.approvalCode$.pipe(
    tap((code) => this.orderApprovalService.loadOrderApproval(code)),
    switchMap((code) => this.orderApprovalService.get(code))
  );

  constructor(
    protected routingService: RoutingService,
    protected orderApprovalService: OrderApprovalService
  ) {}

  getOrder(): Observable<Order> {
    return this.orderApprovalData$.pipe(pluck('order'));
  }
}
