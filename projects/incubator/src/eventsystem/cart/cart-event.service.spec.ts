import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EventEmitter } from '../events/event.emitter';
import { CartEventBuilder } from './cart-event.builder';
import { CartEventService } from './cart-event.service';

class MockEventEmitter {
  attach() {}
}

class MockCartEventBuilder {
  buildBusyEvent() {
    return of('BUSY');
  }
  buildErrorEvent() {
    return of('ERROR');
  }
  buildChangeEvent() {
    return of('CHANGE');
  }
  buildLoadEvent() {
    return of('LOAD');
  }
  buildMergeEvent() {
    return of('MERGE');
  }
  buildEntryCreateEvent() {
    return of('ENTRY_CREATED');
  }
  buildEntryUpdateEvent() {
    return of('ENTRY_UPDATED');
  }
  buildEntryRemoveEvent() {
    return of('ENTRY_REMOVED');
  }
  buildAddEvent() {
    return of('ADD');
  }
}

describe('CartEventService', () => {
  let eventEmitter: EventEmitter;
  let cartEventBuilder: CartEventBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CartEventService,
        {
          provide: EventEmitter,
          useClass: MockEventEmitter,
        },
        {
          provide: CartEventBuilder,
          useClass: MockCartEventBuilder,
        },
      ],
    });

    eventEmitter = TestBed.get(EventEmitter);
    cartEventBuilder = TestBed.get(CartEventBuilder);

    spyOn(eventEmitter, 'attach').and.callThrough();
    spyOn(cartEventBuilder, 'buildAddEvent').and.callThrough();
    spyOn(cartEventBuilder, 'buildLoadEvent').and.callThrough();
    spyOn(cartEventBuilder, 'buildBusyEvent').and.callThrough();

    spyOn(cartEventBuilder, 'buildErrorEvent').and.callThrough();
    spyOn(cartEventBuilder, 'buildChangeEvent').and.callThrough();
    spyOn(cartEventBuilder, 'buildMergeEvent').and.callThrough();

    spyOn(cartEventBuilder, 'buildEntryCreateEvent').and.callThrough();
    spyOn(cartEventBuilder, 'buildEntryRemoveEvent').and.callThrough();
    spyOn(cartEventBuilder, 'buildEntryUpdateEvent').and.callThrough();
  });

  it('should inject service', () => {
    const service = TestBed.get(CartEventService);
    expect(service).toBeTruthy();
  });

  it('should attach events', () => {
    TestBed.get(CartEventService);

    expect(eventEmitter.attach).toHaveBeenCalledTimes(9);

    expect(cartEventBuilder.buildAddEvent).toHaveBeenCalled();
    expect(cartEventBuilder.buildLoadEvent).toHaveBeenCalled();
    expect(cartEventBuilder.buildBusyEvent).toHaveBeenCalled();

    expect(cartEventBuilder.buildErrorEvent).toHaveBeenCalled();
    expect(cartEventBuilder.buildChangeEvent).toHaveBeenCalled();
    expect(cartEventBuilder.buildMergeEvent).toHaveBeenCalled();

    expect(cartEventBuilder.buildEntryCreateEvent).toHaveBeenCalled();
    expect(cartEventBuilder.buildEntryRemoveEvent).toHaveBeenCalled();
    expect(cartEventBuilder.buildEntryUpdateEvent).toHaveBeenCalled();
  });
});
