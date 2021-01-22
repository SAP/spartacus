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
import { CartPageEvent } from './cart-page.events';

@Injectable({
  providedIn: 'root',
})
export class CartPageEventBuilder {
  constructor(
    protected eventService: EventService,
    /** @deprecated @since 3.1 - this will be remove in 4.0 */ protected featureConfigService?: FeatureConfigService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(CartPageEvent, this.buildCartPageEvent());
  }

  protected buildCartPageEvent(): Observable<CartPageEvent> {
    return this.eventService.get(NavigationEvent).pipe(
      filter((navigationEvent) => navigationEvent.semanticRoute === 'cart'),
      map((navigationEvent) =>
        createFrom(CartPageEvent, {
          ...this.createDeprecatedPageEvent(navigationEvent),
          navigation: {
            ...navigationEvent,
          },
        })
      )
    );
  }

  private createDeprecatedPageEvent(
    navigationEvent: NavigationEvent
  ): PageEvent | undefined {
    return this.featureConfigService?.isLevel('!3.1')
      ? { ...navigationEvent }
      : undefined;
  }
}
