import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { EventService } from './event.service';

const EVENT_NUMBER_TWO = 2;
const EVENT_NUMBER_THREE = 3;
const EVENT_NUMBER_FOUR = 4;
const EVENT_NUMBER_HUNDRED = 100;

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
    service.register(EventA, of(new EventA(1), new EventA(EVENT_NUMBER_TWO)));
    service.register(EventB, of(new EventB(EVENT_NUMBER_HUNDRED)));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    expect(results).toEqual([new EventA(1), new EventA(EVENT_NUMBER_TWO)]);
  });

  it('should register many sources for the same type', () => {
    service.register(EventA, of(new EventA(1), new EventA(EVENT_NUMBER_TWO)));
    service.register(EventA, of(new EventA(EVENT_NUMBER_THREE)));
    service.register(EventA, of(new EventA(EVENT_NUMBER_FOUR)));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    expect(results).toEqual([
      new EventA(1),
      new EventA(EVENT_NUMBER_TWO),
      new EventA(EVENT_NUMBER_THREE),
      new EventA(EVENT_NUMBER_FOUR),
    ]);
  });

  it('should allow for dispatch, register, subscribe and dispatch', () => {
    service.dispatch(new EventA(1)); // dispatch before subscription won't be detected
    service.register(EventA, of(new EventA(EVENT_NUMBER_TWO)));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    service.dispatch(new EventA(EVENT_NUMBER_THREE));

    expect(results).toEqual([
      new EventA(EVENT_NUMBER_TWO),
      new EventA(EVENT_NUMBER_THREE),
    ]);
  });

  it('should allow for manual unregistering', () => {
    const unregister = service.register(
      EventA,
      of(new EventA(1), new EventA(EVENT_NUMBER_TWO))
    );
    service.register(
      EventA,
      of(new EventA(EVENT_NUMBER_THREE), new EventA(EVENT_NUMBER_FOUR))
    );
    unregister();

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));

    expect(results).toEqual([
      new EventA(EVENT_NUMBER_THREE),
      new EventA(EVENT_NUMBER_FOUR),
    ]);
  });

  it('should register BehaviorSubject before other sources', () => {
    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    const behaviorSubject$ = new BehaviorSubject(new EventA(1));
    const subject$ = new Subject();
    service.register(EventA, behaviorSubject$);
    service.register(EventA, subject$);
    subject$.next(new EventA(EVENT_NUMBER_TWO));

    expect(results).toEqual([1, EVENT_NUMBER_TWO]);
  });

  it('should register after the subscription', () => {
    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    const of1$ = of(new EventA(1));
    const of2$ = of(new EventA(EVENT_NUMBER_TWO));
    service.register(EventA, of1$);
    service.register(EventA, of2$);

    expect(results).toEqual([1, EVENT_NUMBER_TWO]);
  });

  it('should register before the subscription', () => {
    const of1$ = of(new EventA(1));
    const of2$ = of(new EventA(EVENT_NUMBER_TWO));
    service.register(EventA, of1$);
    service.register(EventA, of2$);

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    expect(results).toEqual([1, EVENT_NUMBER_TWO]);
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
