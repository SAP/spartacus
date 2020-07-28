import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { createFrom, EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PageVisitedEvent } from '../page/page.events';
import { CartPageEvent } from './cart.events';

@Injectable({
  providedIn: 'root',
})
export class CartEventBuilder {
  constructor(
    protected actions: ActionsSubject,
    protected eventService: EventService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(CartPageEvent, this.buildCartPageEvent());
  }

  protected buildCartPageEvent(): Observable<CartPageEvent> {
    return this.eventService.get(PageVisitedEvent).pipe(
      filter((pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'cart'),
      map((pageVisitedEvent) => createFrom(CartPageEvent, pageVisitedEvent))
    );
  }
}
