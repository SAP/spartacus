import { Injectable } from '@angular/core';
import { StateEventService } from '../../../state/event/state-event.service';
import { AuthActions } from '../store/actions/index';
import { LogoutEvent } from './user-auth.events';

@Injectable({
  providedIn: 'root',
})
export class LogoutEventBuilder {
  constructor(protected stateEventService: StateEventService) {
    this.register();
  }

  /**
   * Registers logout events
   */
  protected register(): void {
    this.registerLogoutEvent();
  }

  /**
   * Register a logout event
   */
  protected registerLogoutEvent(): void {
    this.stateEventService.register({
      action: AuthActions.LOGOUT,
      event: LogoutEvent,
    });
  }
}
