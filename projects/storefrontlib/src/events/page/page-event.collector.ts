import { Injectable } from '@angular/core';
import {
  createFrom,
  EventService,
  TmsCollector,
  TmsEvent,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomePageEvent, PageEvent } from './page.events';

/**
 * Registers page event collectors
 */
@Injectable({ providedIn: 'root' })
export class PageEventCollector implements TmsCollector {
  protected pageEvent$ = this.eventsService.get(PageEvent).pipe(
    map((event) =>
      createFrom(TmsEvent, {
        event: PageEvent.type,
        payload: { ...event },
      })
    )
  );

  protected homePage$ = this.eventsService.get(HomePageEvent).pipe(
    map((event) =>
      createFrom(TmsEvent, {
        event: HomePageEvent.type,
        payload: { ...event },
      })
    )
  );

  protected events: Observable<any>[] = [this.pageEvent$, this.homePage$];

  constructor(protected eventsService: EventService) {
    this.events.forEach((event) =>
      this.eventsService.register(TmsEvent, event)
    );
  }

  get(): Observable<any>[] {
    return this.events;
  }
}
