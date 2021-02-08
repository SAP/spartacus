import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, pairwise, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../../event/event.service';
import { StateEventService } from '../../../state/event/state-event.service';
import { UserService } from '../../../user/facade/user.service';
import { createFrom } from '../../../util/create-from';
import { AuthActions } from '../store/actions/index';
import { LoginEvent, LogoutEvent } from './user-auth.events';

@Injectable({
  providedIn: 'root',
})
export class UserAuthEventBuilder {
  constructor(
    protected stateEventService: StateEventService,
    protected userService: UserService,
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService
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
    return this.getAction(AuthActions.LOGOUT).pipe(
      withLatestFrom(
        this.userService.get().pipe(
          pairwise(),
          filter(([prev, curr]) => prev.customerId !== curr.customerId)
        )
      ),
      map(() => createFrom(LogoutEvent, {}))
    );
  }

  /**
   * Returns a stream of actions only of a given type(s)
   *
   * @param actionType type(s) of actions
   */
  protected getAction(
    actionType: string | string[]
  ): Observable<{ type: string; payload?: any }> {
    return this.actionsSubject.pipe(ofType(...[].concat(actionType)));
  }
}
