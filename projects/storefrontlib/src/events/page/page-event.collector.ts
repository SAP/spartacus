import { Injectable } from '@angular/core';
import { AbstractTmsEventCollector, EventService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { HomePageEvent, PageEvent } from './page.events';

/**
 * Registers page event collectors
 */
@Injectable({ providedIn: 'root' })
export class PageEventCollector extends AbstractTmsEventCollector {
  protected pageEvent$ = this.eventsService
    .get(PageEvent)
    .pipe(map((event) => this.mapEvent(PageEvent.type, event)));

  protected homePage$ = this.eventsService
    .get(HomePageEvent)
    .pipe(map((event) => this.mapEvent(HomePageEvent.type, event)));

  protected events$ = [this.pageEvent$, this.homePage$];

  constructor(protected eventsService: EventService) {
    super(eventsService);
    this.registerEvent(...this.events$);
  }
}
