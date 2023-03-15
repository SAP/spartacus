import {  Component, OnDestroy,  Optional } from '@angular/core';
import { CxDatePipe, FeatureConfigService, RoutingService, TranslationService} from '@spartacus/core';
import { OrderHistoryFacade, ReplenishmentOrderHistoryFacade, OrderHistoryList, Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cdp-body',
  templateUrl: './cdp-my-account.component.html',
  styleUrls: ['./cdp-my-account.component.scss'],
  providers: [CxDatePipe],
})

export class CdpMyAccountComponent implements OnDestroy {
  // TODO(#630): make featureConfigService are required dependency and for major releases, remove featureConfigService
  // constructor(
  //   routing: RoutingService,
  //   orderHistoryFacade: OrderHistoryFacade,
  //   translation: TranslationService,
  //   replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
  //   // eslint-disable-next-line @typescript-eslint/unified-signatures
  //   featureConfigService: FeatureConfigService
  // );
  // /**
  //  * @deprecated since 5.1
  //  */
  // constructor(
  //   routing: RoutingService,
  //   orderHistoryFacade: OrderHistoryFacade,
  //   translation: TranslationService,
  //   replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  // );
  constructor(
    protected routing: RoutingService,
    protected orderHistoryFacade: OrderHistoryFacade,
    protected translation: TranslationService,
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
    @Optional() protected featureConfigService?: FeatureConfigService
  ) {}

  private PAGE_SIZE = 3;
  sortType: string;
  hasPONumber: boolean | undefined;
  // orders: any;

  orders$: Observable<OrderHistoryList | undefined> = this.orderHistoryFacade
    .getOrderHistoryList(this.PAGE_SIZE)
    .pipe(
      tap((orders: OrderHistoryList | undefined) => {
        if (orders?.pagination?.sort) {
          this.sortType = orders.pagination.sort;
        }
      })
    );

  ngOnDestroy(): void {
    this.orderHistoryFacade.clearOrderList();
  }

  goToOrderDetail(order: Order): void {
    this.routing.go({
      cxRoute: 'orderDetails',
      params: order,
    });
  }
}
