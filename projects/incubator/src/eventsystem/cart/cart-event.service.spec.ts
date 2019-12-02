import { TestBed } from '@angular/core/testing';
import { EventEmitter } from '../../../../../../core/src/events';
import { CartEventBuilder } from './cart-event.builder';
import {
  CartAddEntryEvent,
  CartAddEvent,
  CartBusyEvent,
  CartChangeEvent,
  CartErrorEvent,
  CartLoadEvent,
  CartMergeEvent,
  CartRemoveEntryEvent,
  CartUpdateEntryEvent,
} from './cart-event.model';
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
  let register: EventEmitter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CartEventService,
        {
          provide: EventEmitter,
          useClass: MockEventRegister,
        },
        {
          provide: CartEventBuilder,
          useClass: MockCartEventBuilder,
        },
      ],
    });

    register = TestBed.get(EventEmitter);

    spyOn(register, 'register').and.callThrough();
  });

  it('should inject service', () => {
    const service = TestBed.get(CartEventService);
    expect(service).toBeTruthy();
  });

  it('should have register CartBusyEvent', () => {
    TestBed.get(CartEventService);
    expect(register.attach).toHaveBeenCalledWith(CartBusyEvent, 'BUSY');
  });

  it('should have register CartErrorEvent', () => {
    TestBed.get(CartEventService);
    expect(register.attach).toHaveBeenCalledWith(CartErrorEvent, 'ERROR');
  });

  it('should have register CartLoadEvent', () => {
    TestBed.get(CartEventService);
    expect(register.attach).toHaveBeenCalledWith(CartLoadEvent, 'LOAD');
  });

  it('should have register CartChangeEvent', () => {
    TestBed.get(CartEventService);
    expect(register.attach).toHaveBeenCalledWith(CartChangeEvent, 'CHANGE');
  });

  it('should have register CartMergeEvent', () => {
    TestBed.get(CartEventService);
    expect(register.attach).toHaveBeenCalledWith(CartMergeEvent, 'MERGE');
  });

  it('should have register CartAddEvent', () => {
    TestBed.get(CartEventService);
    expect(register.attach).toHaveBeenCalledWith(CartAddEvent, 'ADD');
  });

  it('should have register CartAddEntryEvent', () => {
    TestBed.get(CartEventService);
    expect(register.attach).toHaveBeenCalledWith(
      CartAddEntryEvent,
      'ENTRY_CREATED'
    );
  });

  it('should have register ENTRY_UPDATED event', () => {
    TestBed.get(CartEventService);
    expect(register.attach).toHaveBeenCalledWith(
      CartUpdateEntryEvent,
      'ENTRY_UPDATED'
    );
  });

  it('should have register ENTRY_REMOVED event', () => {
    TestBed.get(CartEventService);
    expect(register.attach).toHaveBeenCalledWith(
      CartRemoveEntryEvent,
      'ENTRY_REMOVED'
    );
  });
});
