import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { FeatureConfigService } from '../features-config/services/feature-config.service';
import { CxEvent } from './cx-event';
import { EventService } from './event.service';

class EventA extends CxEvent {
  a: number;
  constructor(a: number) {
    super();
    this.a = a;
  }
}

class EventB extends CxEvent {
  b: number;
  constructor(b: number) {
    super();
    this.b = b;
  }
}

abstract class CartEvent {
  value: number;
}
class AddToCartSuccessEvent extends CartEvent {
  constructor(public value: number) {
    super();
  }
}
class AddToCartFailEvent extends CartEvent {
  constructor(public value: number) {
    super();
  }
}

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isLevel(_version: string): boolean {
    return true;
  }
}

describe('EventService', () => {
  let service: EventService;
  let sub: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    });
    service = TestBed.inject(EventService);
  });

  afterEach(() => {
    if (sub) {
      sub.unsubscribe();
    }
  });

  it('should register different event sources for different types', () => {
    service.register(EventA, of(new EventA(1), new EventA(2)));
    service.register(EventB, of(new EventB(100)));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    expect(results).toEqual([new EventA(1), new EventA(2)]);
  });

  it('should register many sources for the same type', () => {
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

  it('should allow for dispatch, register, subscribe and dispatch', () => {
    service.dispatch(new EventA(1)); // dispatch before subscription won't be detected
    service.register(EventA, of(new EventA(2)));

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e));
    service.dispatch(new EventA(3));

    expect(results).toEqual([new EventA(2), new EventA(3)]);
  });

  it('should create an event before dispatching', () => {
    let result: EventA;
    sub = service
      .get(EventA)
      .pipe(take(1))
      .subscribe((e) => (result = e));
    service.dispatch({ a: 1 }, EventA);

    expect(result).toEqual(new EventA(1));
  });

  it('should allow for manual unregistering', () => {
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

  it('should register BehaviorSubject before other sources', () => {
    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    const behaviorSubject$ = new BehaviorSubject(new EventA(1));
    const subject$ = new Subject();
    service.register(EventA, behaviorSubject$);
    service.register(EventA, subject$);
    subject$.next(new EventA(2));

    expect(results).toEqual([1, 2]);
  });

  it('should register after the subscription', () => {
    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    const of1$ = of(new EventA(1));
    const of2$ = of(new EventA(2));
    service.register(EventA, of1$);
    service.register(EventA, of2$);

    expect(results).toEqual([1, 2]);
  });

  it('should register before the subscription', () => {
    const of1$ = of(new EventA(1));
    const of2$ = of(new EventA(2));
    service.register(EventA, of1$);
    service.register(EventA, of2$);

    const results = [];
    sub = service.get(EventA).subscribe((e) => results.push(e.a));

    expect(results).toEqual([1, 2]);
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

  it('should register the parent class', () => {
    service.register(AddToCartSuccessEvent, of(new AddToCartSuccessEvent(1)));
    service.register(AddToCartFailEvent, of(new AddToCartFailEvent(2)));

    const results: number[] = [];
    sub = service
      .get(CartEvent)
      .subscribe((result) => results.push(result.value));

    expect(results.length).toEqual(2);
    expect(results[0]).toEqual(1);
    expect(results[1]).toEqual(2);
  });
});
