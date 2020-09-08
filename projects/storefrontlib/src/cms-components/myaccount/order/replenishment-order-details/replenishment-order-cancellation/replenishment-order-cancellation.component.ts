import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import {
  ReplenishmentOrder,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from 'projects/storefrontlib/src/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-replenishment-order-cancellation',
  templateUrl: './replenishment-order-cancellation.component.html',
})
export class ReplenishmentOrderCancellationComponent
  implements OnInit, OnDestroy {
  private subscription = new Subscription();

  replenishmentOrderDetails: ReplenishmentOrder;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    protected userReplenishmentOrderService: UserReplenishmentOrderService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userReplenishmentOrderService
        .getReplenishmentOrderDetails()
        .subscribe((value) => (this.replenishmentOrderDetails = value))
    );
  }

  openDialog() {
    this.launchDialogService.launch(
      LAUNCH_CALLER.REPLENISHMENT_ORDER,
      this.vcr
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
