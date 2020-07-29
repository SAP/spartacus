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
import { filter, map } from 'rxjs/operators';
import { HomePageVisitedEvent, PageVisitedEvent } from './page.events';

@Injectable({
  providedIn: 'root',
})
export class PageEventBuilder {
  constructor(
    protected actions: ActionsSubject,
    protected eventService: EventService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(PageVisitedEvent, this.buildPageVisitedEvent());
    this.eventService.register(
      HomePageVisitedEvent,
      this.buildHomePageVisitedEvent()
    );
  }

  protected buildPageVisitedEvent(): Observable<PageVisitedEvent> {
    return this.getNavigatedEvent().pipe(
      // TODO:#events - check mapping
      map((state) => createFrom(PageVisitedEvent, state))
    );
  }

  protected buildHomePageVisitedEvent(): Observable<HomePageVisitedEvent> {
    return this.buildPageVisitedEvent().pipe(
      filter((pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'home'),
      map((pageVisitedEvent) =>
        createFrom(HomePageVisitedEvent, pageVisitedEvent)
      )
    );
  }

  private getNavigatedEvent(): Observable<ActivatedRouterStateSnapshot> {
    return this.actions.pipe(
      ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
      map(
        (event) =>
          (event.payload.routerState as unknown) as ActivatedRouterStateSnapshot
      )
    );
  }
}
