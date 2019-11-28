import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from '../../events';
import { CmsEventBuilder } from './cms-event.builder';
import { PageLoadEvent } from './cms-event.model';

@Injectable({
  providedIn: 'root',
})
export class CmsEventService {
  constructor(
    protected eventRegister: EventEmitter,
    protected builder: CmsEventBuilder
  ) {
    this.attach(PageLoadEvent, builder.buildPageLoadEvent());
  }

  private attach<T>(eventType: Type<T>, value$: Observable<any>) {
    this.eventRegister.attach(
      eventType,
      value$.pipe(map(page => <any>{ page }))
    );
  }
}
