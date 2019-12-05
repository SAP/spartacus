import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { EventEmitter } from './event.emitter';
import { CxEvent, CxEventSource } from './event.model';

class MockEvent extends CxEvent {}
class AnotherMockEvent extends CxEvent {}
class UnknownEvent extends CxEvent {}

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
    it('should attach an single source to an event', () => {
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      const event: CxEventSource<any> = (<any>eventEmitter).getEvent(MockEvent);
      expect(event.sources.value.length).toBe(1);
    });

    it('should attach multiple sources to the same event', () => {
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      eventEmitter.attach(MockEvent, of({ more: 'xyz' }));
      const event: CxEventSource<any> = (<any>eventEmitter).getEvent(MockEvent);
      expect(event.sources.value.length).toBe(2);
    });
  });

  describe('Single event', () => {
    it('should dispatch an event', () => {
      let result;
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      eventEmitter
        .dispatch(MockEvent)
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result.foo).toEqual('bar');
    });

    it('should dispatch an event with mulltiple sources', () => {
      let result;
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      eventEmitter.attach(MockEvent, of({ more: 'xyz' }));
      eventEmitter
        .dispatch(MockEvent)
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual({ foo: 'bar', more: 'xyz' });
    });

    it('should dispatch latest emitted value for registered event', () => {
      let result;

      const subject: BehaviorSubject<any> = new BehaviorSubject({ foo: 'bar' });
      eventEmitter.attach(MockEvent, subject);
      subject.next({ bar: 'foo' });
      eventEmitter.dispatch(MockEvent).subscribe(value => (result = value));
      expect(result.bar).toEqual('foo');
    });
  });

  describe('Multiple event', () => {
    it('should dispatch all events in a combined stream', () => {
      let result;
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      eventEmitter.attach(AnotherMockEvent, of({ another: 'bar' }));
      eventEmitter
        .dispatchAll(MockEvent, AnotherMockEvent)
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result.foo).toEqual('bar');
      expect(result.another).toEqual('bar');
    });

    it('should dispatch any events separately', () => {
      const results = [];
      eventEmitter.attach(MockEvent, of({ foo: 'bar' }));
      eventEmitter.attach(AnotherMockEvent, of({ another: 'bar' }));
      eventEmitter
        .dispatchAny(MockEvent, AnotherMockEvent)
        .subscribe(value => {
          results.push(value);
        })
        .unsubscribe();

      expect(results[0].foo).toEqual('bar');
      expect(results[1].foo).toBeFalsy();
      expect(results[1].another).toEqual('bar');
    });
  });

  describe('Single event', () => {
    it('should return empty subscription for unregistered event', () => {
      let result;
      eventEmitter.dispatch(UnknownEvent).subscribe(value => (result = value));
      expect(result).toBeFalsy();
    });
  });
});
