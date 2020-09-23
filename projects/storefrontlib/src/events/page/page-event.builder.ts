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
import { HomePageEvent, PageEvent } from './page.events';

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
    this.eventService.register(PageEvent, this.buildPageEvent());
    this.eventService.register(HomePageEvent, this.buildHomePageEvent());
  }

  protected buildPageEvent(): Observable<PageEvent> {
    return this.getNavigatedEvent().pipe(
      map((state) =>
        createFrom(PageEvent, {
          context: state.context,
          semanticRoute: state.semanticRoute,
          url: state.url,
          params: state.params,
        })
      )
    );
  }

  protected buildHomePageEvent(): Observable<HomePageEvent> {
    return this.buildPageEvent().pipe(
      filter((pageEvent) => pageEvent.semanticRoute === 'home'),
      map((pageEvent) => createFrom(HomePageEvent, pageEvent))
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
