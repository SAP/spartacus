import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { ActionsSubject } from '@ngrx/store';
import {
  ActivatedRouterStateSnapshot,
  createFrom,
  EventService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationEvent } from './navigation.event';

/**
 * A builder for the NavigationEvent
 */
@Injectable({
  providedIn: 'root',
})
export class NavigationEventBuilder {
  constructor(
    protected actions: ActionsSubject,
    protected eventService: EventService
  ) {
    this.register();
  }

  /**
   * Registers events
   */
  protected register(): void {
    this.eventService.register(NavigationEvent, this.buildNavigationEvent());
  }

  /**
   * Builds the navigation events
   */
  protected buildNavigationEvent(): Observable<NavigationEvent> {
    return this.getNavigatedEvent().pipe(
      map((state) =>
        createFrom(NavigationEvent, {
          context: state.context,
          semanticRoute: state.semanticRoute,
          url: state.url,
          params: state.params,
        })
      )
    );
  }

  private getNavigatedEvent(): Observable<ActivatedRouterStateSnapshot> {
    return this.actions.pipe(
      ofType<RouterNavigatedAction<ActivatedRouterStateSnapshot>>(
        ROUTER_NAVIGATED
      ),
      map((event) => event.payload.routerState)
    );
  }
}
