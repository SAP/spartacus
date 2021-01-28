import { Injectable } from '@angular/core';
import {
  createFrom,
  EventService,
  FeatureConfigService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { PageEvent } from '../page/page.events';
import { HomePageEvent } from './home-page.events';

@Injectable({
  providedIn: 'root',
})
export class HomePageEventBuilder {
  constructor(
    protected eventService: EventService,
    // TODO: #10896 - remove this
    /** @deprecated @since 3.1 - this will be removed in 4.0 */ protected featureConfigService?: FeatureConfigService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(HomePageEvent, this.buildHomePageEvent());
  }

  protected buildHomePageEvent(): Observable<HomePageEvent> {
    return this.eventService.get(NavigationEvent).pipe(
      filter((navigationEvent) => navigationEvent.semanticRoute === 'home'),
      map((navigationEvent) =>
        createFrom(HomePageEvent, {
          ...this.createDeprecatedPageEvent(navigationEvent),
          navigation: { ...navigationEvent },
        })
      )
    );
  }

  private createDeprecatedPageEvent(
    navigationEvent: NavigationEvent
  ): PageEvent | undefined {
    if (
      !this.featureConfigService ||
      this.featureConfigService.isLevel('!3.1')
    ) {
      return { ...navigationEvent };
    }
    return undefined;
  }
}
