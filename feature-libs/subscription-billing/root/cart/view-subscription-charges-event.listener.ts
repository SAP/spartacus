import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Subscription, take } from 'rxjs';
import { ViewSubscriptionChargesEvent } from '@spartacus/subscription-billing/root';

@Injectable({
  providedIn: 'root',
})
export class ViewSubscriptionChargesEventListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected eventService: EventService,
    protected launchDialogService: LaunchDialogService
  ) {
    this.onViewSubscriptionCharges();
  }

  protected onViewSubscriptionCharges() {
    this.subscription.add(
      this.eventService.get(ViewSubscriptionChargesEvent).subscribe((event) => {
        this.openModal(event);
      })
    );
  }

  /**
   * Opens modal based on ViewSubscriptionChargesEvent.
   * @param event Signals that a product has been added to the cart.
   */
  protected openModal(event: ViewSubscriptionChargesEvent): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.SUBSCRIPTION_CHARGES,
      event?.triggerElementRef,
      undefined,
      event?.data
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
