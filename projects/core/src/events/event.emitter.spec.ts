import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { EventRegister as EventEmitter } from './event.emitter';

describe('EventRegister', () => {
  let service: EventEmitter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [EventEmitter],
    });

    service = TestBed.get(EventEmitter);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should return subscription for registered event', () => {
    let result;

    service.register('test', of({ foo: 'bar' }));

    service.get('test').subscribe(value => (result = value));
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should get latest emitted value for registered event', () => {
    let result;

    const subject: BehaviorSubject<any> = new BehaviorSubject({ foo: 'bar' });
    service.register('test', subject);
    subject.next({ bar: 'foo' });
    service.get('test').subscribe(value => (result = value));
    expect(result).toEqual({ bar: 'foo' });
  });

  it('should return empty subscription for unregistered event', () => {
    let result;
    service.get('unknown').subscribe(value => (result = value));
    expect(result).toBeFalsy();
  });
});
