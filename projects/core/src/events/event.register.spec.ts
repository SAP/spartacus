import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { CxEvent } from './event.model';
import { EventRegister } from './event.register';

class MockEvent extends CxEvent<any> {}
class UnknownEvent extends CxEvent<any> {}

describe('EventRegister', () => {
  let register: EventRegister;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [EventRegister],
    });

    register = TestBed.get(EventRegister);
  });

  it('should inject service', () => {
    expect(register).toBeTruthy();
  });

  it('should return subscription for registered event', () => {
    let result;

    register.register(MockEvent, of({ foo: 'bar' }));

    register.getValue(MockEvent).subscribe(value => (result = value));
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should get latest emitted value for registered event', () => {
    let result;

    const subject: BehaviorSubject<any> = new BehaviorSubject({ foo: 'bar' });
    register.register(MockEvent, subject);
    subject.next({ bar: 'foo' });
    register.getValue(MockEvent).subscribe(value => (result = value));
    expect(result).toEqual({ bar: 'foo' });
  });

  it('should return empty subscription for unregistered event', () => {
    let result;
    register.getValue(UnknownEvent).subscribe(value => (result = value));
    expect(result).toBeFalsy();
  });
});
