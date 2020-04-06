import { TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { EventService } from './event.service';

class EventA {
  a: number;
  constructor(a: number) {
    this.a = a;
  }
}

class EventB {
  b: number;
  constructor(b: number) {
    this.b = b;
  }
}

describe('EventService', () => {
  let service: EventService;
  let sub: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  it('should register event sources and get event stream for given event type', () => {
    service.register(EventA, of(new EventA(1), new EventA(2)));
    service.register(EventB, of(new EventB(100)));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    expect(results).toEqual([new EventA(1), new EventA(2)]);
  });

  it('should register event sources and get event stream with merged sources', () => {
    service.register(EventA, of(new EventA(1), new EventA(2)));
    service.register(EventA, of(new EventA(3)));
    service.register(EventA, of(new EventA(4)));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    expect(results).toEqual([
      new EventA(1),
      new EventA(2),
      new EventA(3),
      new EventA(4),
    ]);
  });

  it('should register event sources as well as dispatch occasional events and get event stream for given event type', () => {
    service.dispatch(new EventA(1)); // dispatch before subscription won't be detected
    service.register(EventA, of(new EventA(2), new EventA(3)));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    service.dispatch(new EventA(4)); // dispatch after subscription will be detected

    expect(results).toEqual([new EventA(2), new EventA(3), new EventA(4)]);
  });

  it('register method should return a teardown function which unregisters the given event source', () => {
    const unregister = service.register(
      EventA,
      of(new EventA(1), new EventA(2))
    );
    service.register(EventA, of(new EventA(3), new EventA(4)));
    unregister();

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));

    expect(results).toEqual([new EventA(3), new EventA(4)]);
  });
});
