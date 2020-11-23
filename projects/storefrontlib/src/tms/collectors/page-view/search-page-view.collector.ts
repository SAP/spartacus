import { Injectable } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchPageResultsEvent } from '../../../events/product/product-page.events';
import { TmsDataCollector } from '../../gtm/tms.collector';

@Injectable({ providedIn: 'root' })
export class SearchPageViewCollector implements TmsDataCollector {
  constructor(protected eventService: EventService) {}

  collect(): Observable<any> {
    return this.eventService.get(SearchPageResultsEvent).pipe(
      map((event) => ({
        event: 'SearchPageViewEvent',
        search: { ...event },
      }))
    );
  }
}
