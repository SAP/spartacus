import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { CdcReConsentEvent } from '../../root/events';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CdcReconsentDialogEventListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected eventService: EventService,
    protected launchDialogService: LaunchDialogService
  ) {
    this.onReconsent();
  }
  protected onReconsent() {
    this.subscription.add(
      this.eventService.get(CdcReConsentEvent).subscribe((event) => {
        this.openDialogue(event);
      })
    );
  }

  protected openDialogue(event: CdcReConsentEvent) {
    const reconsentData = {
      user: event.user,
      password: event.password,
      consentIds: event.consentIds,
      errorMessage: event.errorMessage,
      regToken: event.regToken,
    };
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CDC_RECONSENT,
      undefined,
      undefined,
      reconsentData
    );
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
