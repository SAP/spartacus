import { Injectable } from '@angular/core';
import { EventService, TmsEventCollector } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { HomePageEvent, PageEvent } from './page.events';

/**
 * Registers page event collectors
 */
@Injectable({ providedIn: 'root' })
export class PageEventCollector extends TmsEventCollector {
  protected pageEvent$ = this.eventsService
    .get(PageEvent)
    .pipe(map((event) => this.mapEvent(PageEvent.type, event)));

  protected homePage$ = this.eventsService
    .get(HomePageEvent)
    .pipe(map((event) => this.mapEvent(HomePageEvent.type, event)));

  protected sources = [this.pageEvent$, this.homePage$];

  constructor(protected eventsService: EventService) {
    super(eventsService);
  }
}
