import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { createFrom, EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PageEvent } from '../page/page.events';
import { CartPageEvent } from './cart-page.events';

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
    this.eventService.register(CartPageEvent, this.buildCartPageEvent());
  }

  protected buildCartPageEvent(): Observable<CartPageEvent> {
    return this.eventService.get(PageEvent).pipe(
      filter((pageEvent) => pageEvent.semanticRoute === 'cart'),
      map((pageEvent) => createFrom(CartPageEvent, pageEvent))
    );
  }
}
