import { Injectable } from '@angular/core';
import {
  createFrom,
  EventService,
  FeatureConfigService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { HomePageEvent, PageEvent } from './page.events';

@Injectable({
  providedIn: 'root',
})
export class PageEventBuilder {
  constructor(
    protected eventService: EventService,
    // TODO: #10896 - remove this
    /** @deprecated @since 3.1 - this will be remove in 4.0 */ protected featureConfigService?: FeatureConfigService
  ) {
    this.register();
  }

  protected register(): void {
    // TODO: #10896 - remove this if block
    if (this.featureConfigService?.isLevel('!3.1')) {
      this.eventService.register(PageEvent, this.buildPageEvent());
    }
    this.eventService.register(HomePageEvent, this.buildHomePageEvent());
  }

  /**
   * @deprecated @since 3.1 - this will be remove in 4.0. Please use `NavigationEvent` instead.
   */
  protected buildPageEvent(): Observable<PageEvent> {
    return this.eventService.get(NavigationEvent).pipe(
      map((navigationEvent) =>
        createFrom(PageEvent, {
          context: navigationEvent.context,
          semanticRoute: navigationEvent.semanticRoute,
          url: navigationEvent.url,
          params: navigationEvent.params,
          navigation: {
            ...navigationEvent,
          },
        })
      )
    );
  }

  protected buildHomePageEvent(): Observable<HomePageEvent> {
    return this.eventService.get(PageEvent).pipe(
      filter((pageEvent) => pageEvent.semanticRoute === 'home'),
      map((pageEvent) => createFrom(HomePageEvent, { ...pageEvent }))
    );
  }
}
