import { Injectable } from '@angular/core';
import { Order, RoutingService, StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../core/model/order-approval.model';
import { OrderApprovalService } from '../../core/services/order-approval.service';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  pluck,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

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

  protected order$ = this.orderApproval$.pipe(pluck('order'));

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
  getOrderDetailsState(): Observable<StateUtils.LoaderState<OrderApproval>> {
    return this.orderApprovalState$.pipe(
      map((state) => {
        // const orderState = JSON.parse(JSON.stringify(state));
        // console.log(orderState, 'orderState');
        console.log(state, 'state');
        // return state;
        return { ...state, value: state?.value?.order || {} };
        // return Object.assign(orderState, { value: state?.value?.order });
      })
    );
  }
}
