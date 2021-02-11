import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';
import { EventService } from '../../../event/event.service';
import { StateEventService } from '../../../state/event/index';
import { createFrom } from '../../../util/create-from';
import { AuthService } from '../facade/auth.service';
import { AuthActions } from '../store/actions/index';
import { LoginEvent, LogoutEvent } from './user-auth.events';

@Injectable({
  providedIn: 'root',
})
export class UserAuthEventBuilder {
  constructor(
    protected stateEventService: StateEventService,
    protected eventService: EventService,
    protected authService: AuthService
  ) {
    this.register();
  }

  /**
   * Registers user auth events
   */
  protected register(): void {
    this.registerLoginEvent();
    this.registerLogoutEvent();
  }

  /**
   * Register a login event
   */
  protected registerLoginEvent(): void {
    this.stateEventService.register({
      action: AuthActions.LOGIN,
      event: LoginEvent,
    });
  }

  /**
   * Register a logout event
   */
  protected registerLogoutEvent(): void {
    this.eventService.register(LogoutEvent, this.buildLogoutEvent());
  }

  /**
   * Returns logout event stream
   */
  protected buildLogoutEvent(): Observable<LogoutEvent> {
    return this.authService.isUserLoggedIn().pipe(
      pairwise(),
      filter(([prev, curr]) => prev && !curr),
      map(() => createFrom(LogoutEvent, {}))
    );
  }
}
