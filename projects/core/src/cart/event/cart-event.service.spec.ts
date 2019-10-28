import { TestBed } from '@angular/core/testing';
import { EventRegister } from '../../events';
import { CartEventBuilder } from './cart-event.builder';
import { CartEventType } from './cart-event.model';
import { CartEventService } from './cart-event.service';

class MockEventRegister {
  register() {}
}

class MockCartEventBuilder {
  buildBusyEvent() {
    return 'BUSY';
  }
  buildErrorEvent() {
    return 'ERROR';
  }
  buildChangeEvent() {
    return 'CHANGE';
  }
  buildLoadEvent() {
    return 'LOAD';
  }
  buildMergeEvent() {
    return 'MERGE';
  }

  buildEntryCreateEvent() {
    return 'ENTRY_CREATED';
  }
  buildEntryUpdateEvent() {
    return 'ENTRY_UPDATED';
  }
  buildEntryRemoveEvent() {
    return 'ENTRY_REMOVED';
  }
  buildAddEvent() {
    return 'ADD';
  }
}

describe('CartEventService', () => {
  let register: EventRegister;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CartEventService,
        {
          provide: EventRegister,
          useClass: MockEventRegister,
        },
        {
          provide: CartEventBuilder,
          useClass: MockCartEventBuilder,
        },
      ],
    });

    register = TestBed.get(EventRegister);

    spyOn(register, 'register').and.callThrough();
  });

  it('should inject service', () => {
    const service = TestBed.get(CartEventService);
    expect(service).toBeTruthy();
  });

  it('should have register BUSY event', () => {
    TestBed.get(CartEventService);
    expect(register.register).toHaveBeenCalledWith(CartEventType.BUSY, 'BUSY');
  });

  it('should have register ERROR event', () => {
    TestBed.get(CartEventService);
    expect(register.register).toHaveBeenCalledWith(
      CartEventType.ERROR,
      'ERROR'
    );
  });

  it('should have register LOAD event', () => {
    TestBed.get(CartEventService);
    expect(register.register).toHaveBeenCalledWith(CartEventType.LOAD, 'LOAD');
  });

  it('should have register CHANGE event', () => {
    TestBed.get(CartEventService);
    expect(register.register).toHaveBeenCalledWith(
      CartEventType.CHANGE,
      'CHANGE'
    );
  });

  it('should have register MERGE event', () => {
    TestBed.get(CartEventService);
    expect(register.register).toHaveBeenCalledWith(
      CartEventType.MERGE,
      'MERGE'
    );
  });

  it('should have register ADD event', () => {
    TestBed.get(CartEventService);
    expect(register.register).toHaveBeenCalledWith(CartEventType.ADD, 'ADD');
  });

  it('should have register ENTRY_CREATED event', () => {
    TestBed.get(CartEventService);
    expect(register.register).toHaveBeenCalledWith(
      CartEventType.ENTRY_CREATED,
      'ENTRY_CREATED'
    );
  });

  it('should have register ENTRY_UPDATED event', () => {
    TestBed.get(CartEventService);
    expect(register.register).toHaveBeenCalledWith(
      CartEventType.ENTRY_UPDATED,
      'ENTRY_UPDATED'
    );
  });

  it('should have register ENTRY_REMOVED event', () => {
    TestBed.get(CartEventService);
    expect(register.register).toHaveBeenCalledWith(
      CartEventType.ENTRY_REMOVED,
      'ENTRY_REMOVED'
    );
  });
});
