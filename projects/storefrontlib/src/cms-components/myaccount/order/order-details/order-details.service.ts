import { Injectable } from '@angular/core';
import {
  Order,
  RoutingService,
  UserOrderService,
  GlobalMessageService,
  GlobalMessageType,
  CartDataService,
  ANONYMOUS_USERID,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';

@Injectable()
export class OrderDetailsService {
  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;

  orderCode: string;

  constructor(
    userOrderService: UserOrderService,
    routingService: RoutingService,
    globalMessageService: GlobalMessageService, // tslint:disable-line
    cartDataService: CartDataService // tslint:disable-line
  );
  /**
   * @deprecated since 1.x
   * NOTE: check issue:#1224, #1225 for more info
   *
   * TODO(issue:#1224, #1225) Deprecated since 1.x
   */
  constructor(
    userOrderService: UserOrderService,
    routingService: RoutingService
  );
  constructor(
    private userOrderService: UserOrderService,
    private routingService: RoutingService,
    private globalMessageService?: GlobalMessageService,
    private cartDataService?: CartDataService
  ) {
    this.orderCode$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params.orderCode),
      distinctUntilChanged()
    );

    this.orderLoad$ = this.orderCode$.pipe(
      tap(orderCode => {
        this.orderCode = orderCode;
        if (orderCode) {
          if (this.cartDataService.userId === ANONYMOUS_USERID) {
            this.userOrderService.loadOrderDetails(orderCode, ANONYMOUS_USERID);
          } else {
            this.userOrderService.loadOrderDetails(orderCode);
          }
        } else {
          this.userOrderService.clearOrderDetails();
        }
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.globalMessageService
      .get()
      .pipe(filter(messageEntities => !!Object.keys(messageEntities).length))
      .subscribe(messageEntities => {
        const messages =
          messageEntities && messageEntities[GlobalMessageType.MSG_TYPE_ERROR];
        if (
          messages &&
          messages.some(
            message =>
              message.raw ===
              'OrderModel with guid ' +
                this.orderCode +
                ' is not visible due to being older than 0 months'
          )
        ) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.routingService.go({ cxRoute: 'orderExpired' });
        }
      });
  }

  getOrderDetails(): Observable<Order> {
    return this.orderLoad$.pipe(
      switchMap(() => this.userOrderService.getOrderDetails())
    );
  }
}
