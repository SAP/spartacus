import { Injectable } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryPageResultsEvent } from '../../../events/product/product-page.events';
import { TmsDataCollector } from '../../gtm/tms.collector';

@Injectable({ providedIn: 'root' })
export class CategoryPageViewCollector implements TmsDataCollector {
  constructor(protected eventService: EventService) {}

  collect(): Observable<any> {
    return this.eventService.get(CategoryPageResultsEvent).pipe(
      map((event) => ({
        event: 'CategoryPageViewEvent',
        search: { ...event },
      }))
    );
  }
}
