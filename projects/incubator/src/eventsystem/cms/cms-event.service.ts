import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from '../events/event.emitter';
import { CmsEventBuilder } from './cms-event.builder';
import { PageLoadEvent } from './cms-event.model';

@Injectable({
  providedIn: 'root',
})
export class CmsEventService {
  constructor(
    protected eventEmitter: EventEmitter,
    protected builder: CmsEventBuilder
  ) {
    // helper function to attach event sources to the event type
    const attach = <T>(eventType: Type<T>, value$: Observable<any>) =>
      this.eventEmitter.attach(
        eventType,
        value$.pipe(map(page => <any>{ page }))
      );

    attach(PageLoadEvent, builder.buildPageLoadEvent());
  }
}
