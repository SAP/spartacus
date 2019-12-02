import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { EventEmitter } from './event.emitter';
import { CxEvent } from './event.model';

class MockEvent extends CxEvent<any> {}
class UnknownEvent extends CxEvent<any> {}

describe('EventEmitter', () => {
  let register: EventEmitter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [EventEmitter],
    });

    register = TestBed.get(EventEmitter);
  });

  it('should inject service', () => {
    expect(register).toBeTruthy();
  });

  it('should return subscription for registered event', () => {
    let result;

    register.attach(MockEvent, of({ foo: 'bar' }));

    register.dispatch(MockEvent).subscribe(value => (result = value));
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should get latest emitted value for registered event', () => {
    let result;

    const subject: BehaviorSubject<any> = new BehaviorSubject({ foo: 'bar' });
    register.attach(MockEvent, subject);
    subject.next({ bar: 'foo' });
    register.dispatch(MockEvent).subscribe(value => (result = value));
    expect(result).toEqual({ bar: 'foo' });
  });

  it('should return empty subscription for unregistered event', () => {
    let result;
    register.dispatch(UnknownEvent).subscribe(value => (result = value));
    expect(result).toBeFalsy();
  });
});
