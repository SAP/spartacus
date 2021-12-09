import { Injectable, OnDestroy } from '@angular/core';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LogoutEvent,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

/**
 * User account event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class UserAccountEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected globalMessageService: GlobalMessageService
  ) {
    this.onAuth();
  }

  /**
   * Registers events for the auth events.
   */
  protected onAuth(): void {
    this.subscriptions.add(
      this.eventService.get(LogoutEvent).subscribe(() => {
        this.globalMessageService.add(
          { key: 'authMessages.signedOutSuccessfully' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
