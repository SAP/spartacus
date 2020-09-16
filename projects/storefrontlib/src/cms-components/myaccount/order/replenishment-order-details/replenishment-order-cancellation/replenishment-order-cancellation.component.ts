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

  replenishmentOrder$: Observable<
    ReplenishmentOrder
  > = this.userReplenishmentOrderService.getReplenishmentOrderDetails();

  constructor(
    protected userReplenishmentOrderService: UserReplenishmentOrderService,
    protected replenishmentOrderCancellationLaunchDialogService: ReplenishmentOrderCancellationLaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  openDialog() {
    const dialog = this.replenishmentOrderCancellationLaunchDialogService.openDialog(
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
