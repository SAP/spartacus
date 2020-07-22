import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { EventService } from './event.service';

const eventNumbers = [1, 2, 3, 4, 100];

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

  it('should register different event sources for different types', () => {
    service.register(EventA, of(new EventA(1), new EventA(eventNumbers[1])));
    service.register(EventB, of(new EventB(eventNumbers[4])));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    expect(results).toEqual([new EventA(1), new EventA(eventNumbers[1])]);
  });

  it('should register many sources for the same type', () => {
    service.register(EventA, of(new EventA(1), new EventA(eventNumbers[1])));
    service.register(EventA, of(new EventA(eventNumbers[2])));
    service.register(EventA, of(new EventA(eventNumbers[3])));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    expect(results).toEqual([
      new EventA(1),
      new EventA(eventNumbers[1]),
      new EventA(eventNumbers[2]),
      new EventA(eventNumbers[3]),
    ]);
  });

  it('should allow for dispatch, register, subscribe and dispatch', () => {
    service.dispatch(new EventA(1)); // dispatch before subscription won't be detected
    service.register(EventA, of(new EventA(eventNumbers[1])));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    service.dispatch(new EventA(eventNumbers[2]));

    expect(results).toEqual([
      new EventA(eventNumbers[1]),
      new EventA(eventNumbers[2]),
    ]);
  });

  it('should allow for manual unregistering', () => {
    const unregister = service.register(
      EventA,
      of(new EventA(1), new EventA(eventNumbers[1]))
    );
    service.register(
      EventA,
      of(new EventA(eventNumbers[2]), new EventA(eventNumbers[3]))
    );
    unregister();

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));

    expect(results).toEqual([
      new EventA(eventNumbers[2]),
      new EventA(eventNumbers[3]),
    ]);
  });

  it('should register BehaviorSubject before other sources', () => {
    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    const behaviorSubject$ = new BehaviorSubject(new EventA(1));
    const subject$ = new Subject();
    service.register(EventA, behaviorSubject$);
    service.register(EventA, subject$);
    subject$.next(new EventA(eventNumbers[1]));

    expect(results).toEqual([1, eventNumbers[1]]);
  });

  it('should register after the subscription', () => {
    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    const of1$ = of(new EventA(1));
    const of2$ = of(new EventA(eventNumbers[1]));
    service.register(EventA, of1$);
    service.register(EventA, of2$);

    expect(results).toEqual([1, eventNumbers[1]]);
  });

  it('should register before the subscription', () => {
    const of1$ = of(new EventA(1));
    const of2$ = of(new EventA(eventNumbers[1]));
    service.register(EventA, of1$);
    service.register(EventA, of2$);

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    expect(results).toEqual([1, eventNumbers[1]]);
  });

  it('should allow for the re-subscription', () => {
    const of$ = of(new EventA(1));
    service.register(EventA, of$);

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));
    sub.unsubscribe();
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    expect(results).toEqual([1, 1]);
  });
});
