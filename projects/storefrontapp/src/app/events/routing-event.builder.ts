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
import {
  CartPageVisited,
  HomePageVisited,
  OrderConfirmationPageVisited,
  PageVisited,
} from './routing.events';

@Injectable({
  providedIn: 'root',
})
export class RoutingEventBuilder {
  constructor(
    protected actions: ActionsSubject,
    protected eventService: EventService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(PageVisited, this.buildPageVisitedEvent());
    this.eventService.register(
      HomePageVisited,
      this.buildHomePageVisitedEvent()
    );
    this.eventService.register(CartPageVisited, this.buildCartVisitedEvent());
    this.eventService.register(
      OrderConfirmationPageVisited,
      this.orderConfirmationPageVisitedEvent()
    );
  }

  protected buildPageVisitedEvent(): Observable<PageVisited> {
    return this.getNavigatedEvent().pipe(
      // TODO:#events - check mapping
      map((state) => createFrom(PageVisited, state))
    );
  }

  protected buildHomePageVisitedEvent(): Observable<HomePageVisited> {
    return this.buildPageVisitedEvent().pipe(
      filter((pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'home'),
      map((pageVisitedEvent) => createFrom(HomePageVisited, pageVisitedEvent))
    );
  }

  protected buildCartVisitedEvent(): Observable<CartPageVisited> {
    return this.buildPageVisitedEvent().pipe(
      filter((pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'cart'),
      map((pageVisitedEvent) => createFrom(CartPageVisited, pageVisitedEvent))
    );
  }

  protected orderConfirmationPageVisitedEvent(): Observable<
    OrderConfirmationPageVisited
  > {
    return this.buildPageVisitedEvent().pipe(
      filter(
        (pageVisitedEvent) =>
          pageVisitedEvent.semanticRoute === 'orderConfirmation'
      ),
      map((pageVisitedEvent) =>
        createFrom(OrderConfirmationPageVisited, pageVisitedEvent)
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
