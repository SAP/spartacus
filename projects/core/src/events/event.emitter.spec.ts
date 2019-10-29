import { TestBed } from '@angular/core/testing';
import { EventEmitter } from './event.emitter';
import { EventRegister } from './event.register';

class MockEventRegister {
  get(_eventName: string) {}
}

describe('EventEmitter', () => {
  let service: EventEmitter;
  let eventRegister: EventRegister;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventEmitter,
        {
          provide: EventRegister,
          useClass: MockEventRegister,
        },
      ],
    });

    service = TestBed.get(EventEmitter);
    eventRegister = TestBed.get(EventRegister);
    spyOn(eventRegister, 'get').and.callThrough();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should return event subscription', () => {
    service.on('event');
    expect(eventRegister.get).toHaveBeenCalledWith('event');
  });
});
