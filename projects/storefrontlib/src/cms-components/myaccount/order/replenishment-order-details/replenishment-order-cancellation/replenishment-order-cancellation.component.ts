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
import { LaunchDialogService } from '../../../../../layout/launch-dialog/services/launch-dialog.service';
import { LAUNCH_CALLER } from '../../../../../layout/launch-dialog/config/launch-config';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-replenishment-order-cancellation',
  templateUrl: './replenishment-order-cancellation.component.html',
})
export class ReplenishmentOrderCancellationComponent implements OnDestroy {
  @ViewChild('element') element: ElementRef;

  private subscription = new Subscription();

  replenishmentOrder$: Observable<ReplenishmentOrder> = this.userReplenishmentOrderService.getReplenishmentOrderDetails();

  constructor(
    protected userReplenishmentOrderService: UserReplenishmentOrderService,
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
