import { Injectable } from '@angular/core';
import { StateEventService } from '../../../state/event/state-event.service';
import { AuthActions } from '../store/actions';
import { LoginEvent } from './user-auth.events';

@Injectable({
  providedIn: 'root',
})
export class LoginEventBuilder {
  constructor(protected stateEventService: StateEventService) {
    this.register();
  }

  /**
   * Registers logout events
   */
  protected register(): void {
    this.logoutEvent();
  }

  /**
   * Register a logout event
   */
  protected logoutEvent(): void {
    this.stateEventService.register({
      action: AuthActions.LOGIN,
      event: LoginEvent,
    });
  }
}
