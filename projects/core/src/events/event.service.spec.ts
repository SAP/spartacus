import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EventRegister } from './event.register';
import { EventService } from './event.service';

class MockEventRegister {
  getValue(_eventName: string) {
    return of('test value');
  }
}

class MockEvent {}

describe('EventService', () => {
  let service: EventService;
  let eventRegister: EventRegister;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        {
          provide: EventRegister,
          useClass: MockEventRegister,
        },
      ],
    });

    service = TestBed.get(EventService);
    eventRegister = TestBed.get(EventRegister);
    spyOn(eventRegister, 'getValue').and.callThrough();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should return event subscription', () => {
    service.on(MockEvent);
    expect(eventRegister.getValue).toHaveBeenCalledWith(MockEvent);
  });

  it('should map to CxEvent', () => {
    let result;
    service
      .on(MockEvent)
      .subscribe(ev => (result = ev))
      .unsubscribe();
    expect(result.value).toEqual('test value');
  });
});
