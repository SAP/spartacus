import { Observable } from 'rxjs';
import { createFrom } from '../util/create-from';
import { EventService } from './event.service';

export class TmsEvent {
  static readonly type = 'TmsEvent';
  event: string;
  payload: any;
}

export abstract class TmsEventCollector {
  protected abstract sources: Observable<TmsEvent>[] = [];

  constructor(protected eventsService: EventService) {}

  protected mapEvent<T>(type: string, event: T): TmsEvent {
    return createFrom(TmsEvent, {
      event: type,
      payload: { ...event },
    });
  }

  protected register(): void {
    this.sources.forEach((event$) => {
      this.eventsService.register(TmsEvent, event$);
    });
  }
}
