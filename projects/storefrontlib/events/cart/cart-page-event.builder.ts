import { Injectable } from '@angular/core';
import { createFrom, EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { CartPageEvent } from './cart-page.events';

@Injectable({
  providedIn: 'root',
})
export class CartPageEventBuilder {
  constructor(protected eventService: EventService) {
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
