import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import {
  createFrom,
  EventService,
  FeatureConfigService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { PageEvent } from './page.events';

@Injectable({
  providedIn: 'root',
})
// TODO: #10896 - delete this whole file
/**
 * @deprecated @since 3.1 - this builder will be removed in 4.0. Please use NavigationEventBuilder and NavigationEvent instead.
 */
export class PageEventBuilder {
  constructor(
    /** @deprecated @since 3.1 - this will be removed in 4.0 */
    protected actions: ActionsSubject,
    protected eventService: EventService,
    /** @deprecated @since 3.1 - this will be removed in 4.0 */ protected featureConfigService?: FeatureConfigService
  ) {
    this.register();
  }

  protected register(): void {
    if (this.featureConfigService?.isLevel('!3.1')) {
      this.eventService.register(PageEvent, this.buildPageEvent());
    }
  }

  /**
   * @deprecated @since 3.1 - this will be removed in 4.0. Please use `NavigationEvent` instead.
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
}
