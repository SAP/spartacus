import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { EventEmitter } from './event.emitter';
import { Event, EventSource } from './event.model';

class MockEvent extends Event {}
class UnknownEvent extends Event {}

describe('EventEmitter', () => {
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [EventEmitter],
    });

    eventEmitter = TestBed.get(EventEmitter);
  });

  it('should inject service', () => {
    expect(eventEmitter).toBeTruthy();
  });

  describe('Attach', () => {
    it('should attach a single source to an event', () => {
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      const event: EventSource<any> = (<any>eventEmitter).getEvent(MockEvent);
      expect(event.sources.value.length).toBe(1);
    });

    it('should attach multiple sources to the same event', () => {
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      eventEmitter.attach(MockEvent, of({ more: 'xyz' }));
      const event: EventSource<any> = (<any>eventEmitter).getEvent(MockEvent);
      expect(event.sources.value.length).toBe(2);
    });
  });

  describe('Single event', () => {
    it('should observe an event', () => {
      let result;
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      eventEmitter
        .observe(MockEvent)
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result.foo).toEqual('bar');
    });

    it('should observe an event with mulltiple sources', () => {
      let result;
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      eventEmitter.attach(MockEvent, of({ more: 'xyz' }));
      eventEmitter
        .observe(MockEvent)
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual({ foo: 'bar', more: 'xyz' });
    });

    it('should observe latest value for attached event source', () => {
      let result;

      const subject: BehaviorSubject<any> = new BehaviorSubject({ foo: 'bar' });
      eventEmitter.attach(MockEvent, subject);
      subject.next({ bar: 'foo' });
      eventEmitter.observe(MockEvent).subscribe(value => (result = value));
      expect(result.bar).toEqual('foo');
    });
  });

  describe('Single event', () => {
    it('should return empty subscription for unregistered event', () => {
      let result;
      eventEmitter.observe(UnknownEvent).subscribe(value => (result = value));
      expect(result).toBeFalsy();
    });
  });
});
