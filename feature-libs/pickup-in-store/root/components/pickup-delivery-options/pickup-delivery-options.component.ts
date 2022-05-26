import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PickupInStoreFacade } from '../../facade/pickup-in-store.facade';

@Component({
  selector: 'cx-pickup-delivery-options',
  templateUrl: './pickup-delivery-options.component.html',
})
export class PickupDeliveryOptionsComponent implements OnInit, OnDestroy {
  @ViewChild('open') element: ElementRef;
  private subscription = new Subscription();

  constructor(
    protected pickupInStoreFacade: PickupInStoreFacade,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}
  ngOnInit() {
    this.pickupInStoreFacade.getStore();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.element,
      this.vcr,
      { msg: 'London' }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }
}
