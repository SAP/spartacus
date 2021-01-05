import { Injectable } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageVisitedEvent } from '../../events/page/page.events';
import { TmsDataCollector } from '../gtm/tms.collector';

@Injectable({ providedIn: 'root' })
export class PageViewCollector implements TmsDataCollector {
  constructor(protected eventService: EventService) {}

  collect(): Observable<any> {
    return this.eventService.get(PageVisitedEvent).pipe(
      map((event) => ({
        event: 'PageView',
        url: event.url,
        title: 'TODO',
      }))
    );
  }
}
