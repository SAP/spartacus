import { Injectable } from '@angular/core';
import { CartUpdateEntrySuccessEvent, EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TmsDataCollector } from '../../gtm/tms.collector';

@Injectable({ providedIn: 'root' })
export class UpdateCartEntryCollector implements TmsDataCollector {
  constructor(protected eventService: EventService) {}

  collect(): Observable<any> {
    return this.eventService.get(CartUpdateEntrySuccessEvent).pipe(
      map((event) => ({
        event: 'UpdateCartEntryEvent',
        cart: { ...event },
      }))
    );
  }
}
