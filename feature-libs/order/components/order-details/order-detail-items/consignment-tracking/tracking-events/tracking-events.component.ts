import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsignmentTracking, OrderHistoryFacade } from '@spartacus/order/root';
import { FocusConfig, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-tracking-events',
  templateUrl: './tracking-events.component.html',
})
export class TrackingEventsComponent implements OnDestroy, OnInit {
  private subscription = new Subscription();
  tracking$: Observable<ConsignmentTracking>;
  shipDate: Date;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  constructor(
    private orderHistoryFacade: OrderHistoryFacade,
    protected launchdialogService: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.launchdialogService.data$.subscribe((data) => {
        this.init(data.tracking$, data.shipDate);
      })
    );
  }

  ngOnDestroy(): void {
    this.orderHistoryFacade.clearConsignmentTracking();
    this.subscription?.unsubscribe();
  }

  init(tracking$: Observable<ConsignmentTracking>, shipDate: Date) {
    this.tracking$ = tracking$;
    this.shipDate = shipDate;
  }

  close(reason?: any): void {
    this.launchdialogService.closeDialog(reason);
  }
}
