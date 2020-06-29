import { Injectable } from '@angular/core';
import { Order, OrderApprovalService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, pluck, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderApprovalDetailService {
  approvalCode$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.params.approvalCode)
    //tap((code) => console.log('Approval code ', code))
  );

  orderApprovalData$ = this.approvalCode$.pipe(
    tap((code) => this.orderApprovalService.loadOrderApproval(code)),
    switchMap((code) => this.orderApprovalService.get(code))
  );

  constructor(
    protected routingService: RoutingService,
    protected orderApprovalService: OrderApprovalService
  ) {}

  getOrderDetails(): Observable<Order> {
    return this.orderApprovalData$.pipe(pluck('order')).pipe(take(1));
  }
}
