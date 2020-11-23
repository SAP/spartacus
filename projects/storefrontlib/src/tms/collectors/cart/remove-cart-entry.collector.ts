import { Injectable } from '@angular/core';
import { CartRemoveEntrySuccessEvent, EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TmsDataCollector } from '../../gtm/tms.collector';

@Injectable({ providedIn: 'root' })
export class RemoveCartEntryCollector implements TmsDataCollector {
  constructor(protected eventService: EventService) {}

  collect(): Observable<any> {
    return this.eventService.get(CartRemoveEntrySuccessEvent).pipe(
      map((event) => ({
        event: 'RemoveCartEntryEvent',
        cart: { ...event },
      }))
    );
  }
}
