import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Subscription, take } from 'rxjs';
import { CancelPopupEvent } from './cancel-event';

@Injectable({
  providedIn: 'root',
})
export class CancelPopupEventListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected eventService: EventService,
    protected launchDialogService: LaunchDialogService
  ) {
    this.onViewCancelSubscription();
  }

  protected onViewCancelSubscription() {
    this.subscription.add(
      this.eventService.get(CancelPopupEvent).subscribe((event) => {
        this.openModal(event);
      })
    );
  }

  /**
   * Opens modal based on CancelPopupEvent.
   * @param event Signals that a product has been added to the cart.
   */
  protected openModal(event: CancelPopupEvent): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.SUBSCRIPTION_CANCEL,
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
