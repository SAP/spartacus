import { Subject, Subscription } from 'rxjs';

export class EventListener {
  eventName?: string = undefined;
  events?: Subject<Event> = undefined;
  eventsSubscription?: Subscription = undefined;
  teardownCallback?: () => void = undefined;
}
