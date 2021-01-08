import { Observable } from 'rxjs';
import { createFrom } from '../util/create-from';
import { EventService } from './event.service';

export class TmsEvent {
  static type = 'TmsEvent';
  event: string;
  payload: any;
}

export abstract class AbstractTmsEventCollector {
  protected abstract events$: Observable<TmsEvent>[];

  constructor(protected eventsService: EventService) {}

  protected registerEvent(...events$: Observable<TmsEvent>[]): void {
    events$.forEach((event$) => this.eventsService.register(TmsEvent, event$));
  }

  protected mapEvent<T>(type: string, event: T): TmsEvent {
    return createFrom(TmsEvent, {
      event: type,
      payload: { ...event },
    });
  }
}
