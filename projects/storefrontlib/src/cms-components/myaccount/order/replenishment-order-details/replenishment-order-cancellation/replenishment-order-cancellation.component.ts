import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ReplenishmentOrder,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ReplenishmentOrderCancellationLaunchDialogService } from './replenishment-order-cancellation-launch-dialog.service';

@Component({
  selector: 'cx-replenishment-order-cancellation',
  templateUrl: './replenishment-order-cancellation.component.html',
})
export class ReplenishmentOrderCancellationComponent implements OnDestroy {
  @ViewChild('element') element: ElementRef;

  private subscription = new Subscription();

  replenishmentOrder$: Observable<ReplenishmentOrder> = this.userReplenishmentOrderService.getReplenishmentOrderDetails();

  // TODO(#12167): make launchDialogService a required dependency instead of replenishmentOrderCancellationLaunchDialogService and remove deprecated constructor
  /**
   * Default constructor
   *
   * @param {UserReplenishmentOrderService} userReplenishmentOrderService
   * @param {ViewContainerRef} vcr
   * @param {LaunchDialogService} launchDialogService
   */
  constructor(
    userReplenishmentOrderService: UserReplenishmentOrderService,
    vcr: ViewContainerRef,
    launchDialogService: LaunchDialogService
  );

  /**
   * @deprecated since 3.3
   */
  constructor(
    userReplenishmentOrderService: UserReplenishmentOrderService,
    vcr: ViewContainerRef,
    replenishmentOrderCancellationLaunchDialogService: ReplenishmentOrderCancellationLaunchDialogService
  );
  constructor(
    protected userReplenishmentOrderService: UserReplenishmentOrderService,
    protected replenishmentOrderCancellationLaunchDialogService: ReplenishmentOrderCancellationLaunchDialogService,
    protected vcr: ViewContainerRef,
    protected launchDialogService?: LaunchDialogService
  ) {}

  openDialog() {
    // TODO(#12167): use launchDialogService only
    if (this.launchDialogService) {
      const dialog = this.launchDialogService.openDialog(
        LAUNCH_CALLER.REPLENISHMENT_ORDER,
        this.element,
        this.vcr
      );

      if (dialog) {
        this.subscription.add(dialog.pipe(take(1)).subscribe());
      }
    } else {
      const dialog = this.replenishmentOrderCancellationLaunchDialogService.openDialog(
        this.element,
        this.vcr
      );

      if (dialog) {
        this.subscription.add(dialog.pipe(take(1)).subscribe());
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userReplenishmentOrderService.clearReplenishmentOrderDetails();
  }
}
