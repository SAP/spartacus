import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RoutingService, TranslationService } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UnitOrderFacade } from '../../root/facade/unit-order.facade';
import { FormControl } from "@angular/forms";
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'cx-unit-level-order-history',
  templateUrl: './unit-level-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitLevelOrderHistoryComponent implements OnDestroy {
  private PAGE_SIZE = 5;
  sortType: string;
  timeout: Timeout;

  userFilter: FormControl = new FormControl();
  unitFilter: FormControl = new FormControl();
  encodedFilter: string;

  constructor(
    protected routing: RoutingService,
    protected unitOrdersFacade: UnitOrderFacade,
    protected translation: TranslationService
  ) {}

  orders$: Observable<OrderHistoryList | undefined> = this.unitOrdersFacade
    .getOrderHistoryList(this.PAGE_SIZE)
    .pipe(
      tap((orders: OrderHistoryList | undefined) => {
        if (orders?.pagination?.sort) {
          this.sortType = orders.pagination.sort;
        }
      })
    );

  isLoaded$: Observable<boolean> =
    this.unitOrdersFacade.getOrderHistoryListLoaded();

  ngOnDestroy(): void {
    this.unitOrdersFacade.clearOrderList();
  }

  onFiltering() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.refresh(this.userFilter.value, this.unitFilter.value);
    }, 400);
  }

  refresh(user: string, unit: string) {
    let filters: string[] = [];
    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');

    this.encodedFilter = filters.join(':');

    this.fetchOrders({
      currentPage: 0,
      sortCode: this.sortType,
      filters: this.encodedFilter,
    })
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number; filters: string } = {
      sortCode,
      currentPage: 0,
      filters: this.encodedFilter,
    };
    this.sortType = sortCode;
    this.fetchOrders(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number; filters: string } = {
      sortCode: this.sortType,
      currentPage: page,
      filters: this.encodedFilter,
    };
    this.fetchOrders(event);
  }

  goToOrderDetail(order: Order): void {
    this.routing.go({
      cxRoute: 'orderDetails',
      params: order,
    });
  }

  getSortLabels(): Observable<{ byDate: string; byOrderNumber: string }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.orderNumber'),
      this.translation.translate('unitLevelOrderHistorySorting.orgUnit'),
      this.translation.translate('unitLevelOrderHistorySorting.buyer'),
      this.translation.translate('unitLevelOrderHistorySorting.orgUnitDesc'),
      this.translation.translate('unitLevelOrderHistorySorting.buyerDesc'),
    ]).pipe(
      map(
        ([
          textByDate,
          textByOrderNumber,
          textByOrgUnit,
          textByBuyer,
          textByOrgUnitDesc,
          textByBuyerDesc,
        ]) => {
          return {
            byDate: textByDate,
            byOrderNumber: textByOrderNumber,
            byOrgUnit: textByOrgUnit,
            byBuyer: textByBuyer,
            byOrgUnitDesc: textByOrgUnitDesc,
            byBuyerDesc: textByBuyerDesc,
          };
        }
      )
    );
  }

  private fetchOrders(event: { sortCode: string; currentPage: number; filters: string }): void {
    this.unitOrdersFacade.loadOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.filters,
      event.sortCode
    );
  }
}
