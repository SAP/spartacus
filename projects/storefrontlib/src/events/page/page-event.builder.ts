import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { ActionsSubject } from '@ngrx/store';
import {
  ActivatedRouterStateSnapshot,
  createFrom,
  EventService,
  PageMetaService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { HomePageEvent, PageEvent } from './page.events';

@Injectable({
  providedIn: 'root',
})
export class PageEventBuilder {
  constructor(
    protected actions: ActionsSubject,
    protected eventService: EventService,
    protected pageMetaService: PageMetaService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(PageEvent, this.buildPageEvent());
    this.eventService.register(HomePageEvent, this.buildHomePageEvent());
  }

  protected buildPageEvent(): Observable<PageEvent> {
    const navigation$ = this.getNavigatedEvent();
    const pageTitle$ = this.pageMetaService
      .getMeta()
      .pipe(map((meta) => (meta ? meta.title : undefined)));

    return navigation$.pipe(
      switchMap((state) =>
        pageTitle$.pipe(
          map((title) =>
            createFrom(PageEvent, {
              ...{
                title,
                context: state?.context,
                semanticRoute: state?.semanticRoute,
                url: state?.url,
                params: state?.params,
              },
            })
          )
        )
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
