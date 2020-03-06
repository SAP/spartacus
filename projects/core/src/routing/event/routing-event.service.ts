import { Injectable, Type } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RoutingEvents } from './routing-event.model';

@Injectable({
  providedIn: 'root',
})
export class RoutingEventService {
  /**
   * Maps Angular event `NavigationStart` to spartacus navigation event
   */
  navigation$: Observable<RoutingEvents.Navigation> = this.getRouterEvent(
    NavigationStart
  ).pipe(map(event => new RoutingEvents.Navigation({ url: event.url })));

  /**
   * Maps Angular event `NavigationEnd` to spartacus navigation success event
   */
  navigationSuccess$: Observable<
    RoutingEvents.NavigationSuccess
  > = this.getRouterEvent(NavigationEnd).pipe(
    map(
      event =>
        new RoutingEvents.NavigationSuccess({ url: event.urlAfterRedirects })
    )
  );

  /**
   * Maps Angular event `NavigationStart` to spartacus navigation event
   */
  navigationCancel$: Observable<
    RoutingEvents.NavigationCancel
  > = this.getRouterEvent(NavigationCancel).pipe(
    map(event => new RoutingEvents.NavigationCancel({ url: event.url }))
  );

  /**
   * Returns an observable emitting only angular routing events of given type
   */
  protected getRouterEvent<T extends RouterEvent>(
    routerEventType: Type<T>
  ): Observable<T> {
    return this.router.events.pipe(
      filter<T>(event => event instanceof routerEventType)
    );
  }

  constructor(protected router: Router) {}
}
