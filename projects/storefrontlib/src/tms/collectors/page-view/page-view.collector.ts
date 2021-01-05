import { Injectable } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageEvent } from '../../../events/page/page.events';
import { TmsDataCollector } from '../../gtm/tms.collector';

@Injectable({ providedIn: 'root' })
export class PageViewCollector implements TmsDataCollector {
  constructor(protected eventService: EventService) {}

  collect(): Observable<any> {
    return this.eventService.get(PageEvent).pipe(
      map((event) => ({
        event: 'PageView',
        page: {
          ...event.context, // flatten context
          url: event.url,
          params: event.params,
          cmsPath: event.semanticRoute,
        },
      }))
    );
  }
}
