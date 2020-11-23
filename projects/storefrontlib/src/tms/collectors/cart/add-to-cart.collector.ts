import { Injectable } from '@angular/core';
import { CartAddEntrySuccessEvent, EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TmsDataCollector } from '../../gtm/tms.collector';

@Injectable({ providedIn: 'root' })
export class CartChangeCollector implements TmsDataCollector {
  constructor(protected eventService: EventService) {}

  collect(): Observable<any> {
    return this.eventService.get(CartAddEntrySuccessEvent).pipe(
      map((event) => ({
        event: 'AddToCartEvent',
        cart: { ...event },
      }))
    );
  }
}
