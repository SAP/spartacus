import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ReplenishmentOrder } from '@spartacus/core';
import { ReplenishmentOrderFacade } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-replenishment-order-cancellation',
  templateUrl: './replenishment-order-cancellation.component.html',
})
export class ReplenishmentOrderCancellationComponent implements OnDestroy {
  @ViewChild('element') element: ElementRef;

  private subscription = new Subscription();

  replenishmentOrder$: Observable<ReplenishmentOrder> =
    this.userReplenishmentOrderService.getReplenishmentOrderDetails();

  constructor(
    protected userReplenishmentOrderService: ReplenishmentOrderFacade,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  openDialog() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.REPLENISHMENT_ORDER,
      this.element,
      this.vcr
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userReplenishmentOrderService.clearReplenishmentOrderDetails();
  }
}
