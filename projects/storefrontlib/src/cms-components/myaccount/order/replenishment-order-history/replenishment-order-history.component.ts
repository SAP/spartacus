import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ReplenishmentOrder,
  ReplenishmentOrderList,
  RoutingService,
  TranslationService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { LaunchDialogService } from '../../../../layout/launch-dialog/services/launch-dialog.service';
import { LAUNCH_CALLER } from '../../../../layout/launch-dialog/config/launch-config';

@Component({
  selector: 'cx-replenishment-order-history',
  templateUrl: './replenishment-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplenishmentOrderHistoryComponent implements OnDestroy {
  @ViewChild('element') element: ElementRef;

  private subscription = new Subscription();

  private PAGE_SIZE = 5;
  sortType: string;

  replenishmentOrders$: Observable<ReplenishmentOrderList> = this.userReplenishmentOrderService
    .getReplenishmentOrderHistoryList(this.PAGE_SIZE)
    .pipe(
      tap((replenishmentOrders: ReplenishmentOrderList) => {
        if (replenishmentOrders.pagination) {
          this.sortType = replenishmentOrders.pagination.sort;
        }
      })
    );

  isLoaded$: Observable<boolean> = this.userReplenishmentOrderService.getReplenishmentOrderHistoryListSuccess();

  constructor(
    protected routing: RoutingService,
    protected userReplenishmentOrderService: UserReplenishmentOrderService,
    protected translation: TranslationService,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchReplenishmentOrders(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchReplenishmentOrders(event);
  }

  goToOrderDetail(order: ReplenishmentOrder): void {
    this.routing.go({
      cxRoute: 'replenishmentDetails',
      params: order,
    });
  }

  getSortLabels(): Observable<{
    byDate: string;
    byReplenishmentNumber: string;
    byNextOrderDate: string;
  }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.replenishmentNumber'),
      this.translation.translate('sorting.nextOrderDate'),
    ]).pipe(
      map(([textByDate, textByOrderNumber, textbyNextOrderDate]) => {
        return {
          byDate: textByDate,
          byReplenishmentNumber: textByOrderNumber,
          byNextOrderDate: textbyNextOrderDate,
        };
      })
    );
  }

  openDialog(event: Event, replenishmentOrderCode: string): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.REPLENISHMENT_ORDER,
      this.element,
      this.vcr,
      replenishmentOrderCode
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
    event.stopPropagation();
  }

  private fetchReplenishmentOrders(event: {
    sortCode: string;
    currentPage: number;
  }): void {
    this.userReplenishmentOrderService.loadReplenishmentOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userReplenishmentOrderService.clearReplenishmentOrderList();
  }
}
