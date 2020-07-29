import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { createFrom, EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PageVisitedEvent } from '../page/page.events';
import { CartPageVisitedEvent } from './cart-page.events';

@Injectable({
  providedIn: 'root',
})
export class CartPageEventBuilder {
  constructor(
    protected actions: ActionsSubject,
    protected eventService: EventService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(CartPageVisitedEvent, this.buildCartPageEvent());
  }

  protected buildCartPageEvent(): Observable<CartPageVisitedEvent> {
    return this.eventService.get(PageVisitedEvent).pipe(
      filter((pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'cart'),
      map((pageVisitedEvent) =>
        createFrom(CartPageVisitedEvent, pageVisitedEvent)
      )
    );
  }
}
