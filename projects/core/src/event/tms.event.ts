import { Observable } from 'rxjs';
import { createFrom } from '../util/create-from';
import { EventService } from './event.service';

export class TmsEvent {
  static type = 'TmsEvent';
  event: string;
  payload: any;
}

export abstract class TmsEventCollector {
  protected abstract sources: Observable<TmsEvent>[];

  constructor(protected eventsService: EventService) {}

  protected registerEvent(...sources: Observable<TmsEvent>[]): void {
    sources.forEach((event$) => this.eventsService.register(TmsEvent, event$));
  }

  protected mapEvent<T>(type: string, event: T): TmsEvent {
    return createFrom(TmsEvent, {
      event: type,
      payload: { ...event },
    });
  }
}
