import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EventEmitter } from './event.emitter';
import { EventService } from './event.service';

class MockEventEmitter {
  dispatch(_eventName: string) {
    return of('dispatched value');
  }
  dispatchAny(_eventName: string) {
    return of('dispatch any value');
  }
  dispatchAll(_eventName: string) {
    return of('test value');
  }
}

class MockEvent {}
class AnotherMockEvent {}

describe('EventService', () => {
  let service: EventService;
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        {
          provide: EventEmitter,
          useClass: MockEventEmitter,
        },
      ],
    });

    service = TestBed.get(EventService);
    eventEmitter = TestBed.get(EventEmitter);
    spyOn(eventEmitter, 'dispatch').and.callThrough();
    spyOn(eventEmitter, 'dispatchAny').and.callThrough();
    spyOn(eventEmitter, 'dispatchAll').and.callThrough();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch event', () => {
    service.get(MockEvent);
    expect(eventEmitter.dispatchAny).toHaveBeenCalledWith(MockEvent);
  });

  it('should dispatch event value', () => {
    let result;
    service
      .get(MockEvent)
      .subscribe(ev => (result = ev))
      .unsubscribe();
    expect(result).toEqual('dispatch any value');
  });

  it('should dispatch multiple events', () => {
    service.get(MockEvent, AnotherMockEvent);
    expect(eventEmitter.dispatchAny).toHaveBeenCalledWith(
      MockEvent,
      AnotherMockEvent
    );
  });

  it('should dispatch event with a single dependency', () => {
    service.getCombined(MockEvent, AnotherMockEvent);
    expect(eventEmitter.dispatch).toHaveBeenCalledWith(MockEvent);
    expect(eventEmitter.dispatchAll).toHaveBeenCalledWith(AnotherMockEvent);
  });
});
