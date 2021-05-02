import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import {
  createFrom,
  EventService,
  FeatureConfigService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { CartPageEvent } from './cart-page.events';

@Injectable({
  providedIn: 'root',
})
export class CartPageEventBuilder {
  constructor(
    // TODO: #10896 - remove this
    /** @deprecated @since 3.1 - this will be removed in 4.0 */
    protected actions: ActionsSubject,
    protected eventService: EventService,
    // TODO: #10896 - remove this
    /** @deprecated @since 3.1 - this will be removed in 4.0 */ protected featureConfigService?: FeatureConfigService
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
          navigation: navigationEvent,
        })
      )
    );
  }
}
