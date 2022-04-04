import { Injectable } from '@angular/core';
import { RoutingService, StateUtils } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  pluck,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { OrderApproval } from '../../core/model/order-approval.model';
import { OrderApprovalService } from '../../core/services/order-approval.service';

@Injectable({
  providedIn: 'root',
})
export class OrderApprovalDetailService {
  protected approvalCode$ = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params.approvalCode));

  protected orderApproval$ = this.approvalCode$.pipe(
    filter(Boolean),
    tap((approvalCode: string) =>
      this.orderApprovalService.loadOrderApproval(approvalCode)
    ),
    switchMap((approvalCode: string) =>
      this.orderApprovalService.get(approvalCode)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected order$ = this.orderApproval$.pipe(pluck('order'));

  orderApprovalState$ = this.approvalCode$.pipe(
    filter(Boolean),
    tap((approvalCode: string) =>
      this.orderApprovalService.loadOrderApproval(approvalCode)
    ),
    switchMap((approvalCode: string) =>
      this.orderApprovalService.getState(approvalCode)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    protected routingService: RoutingService,
    protected orderApprovalService: OrderApprovalService
  ) {}

  /**
   * Returns a string that represents the approval code
   * found in the page url.
   */
  getOrderApprovalCodeFromRoute(): Observable<string> {
    return this.approvalCode$;
  }

  /**
   * Returns the order data from the approval details that have been
   * retrieved from the approval code in the page url.
   */
  getOrderDetails(): Observable<Order> {
    return this.order$;
  }

  /**
   * Returns the approval details that have been retrieved from the
   * approval code in the page url.
   */
  getOrderApproval(): Observable<OrderApproval> {
    return this.orderApproval$;
  }

  /**
   * Returns the order details state
   */
  getOrderDetailState(): Observable<StateUtils.LoaderState<OrderApproval>> {
    return this.orderApprovalState$.pipe(
      map((state) => {
        return { ...state, value: state?.value?.order || {} };
      })
    );
  }
}
