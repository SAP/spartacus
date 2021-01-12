import { TestBed } from '@angular/core/testing';
import { EventService, TmsEvent } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutEventCollector } from './checkout-event.collector';
import { OrderPlacedEvent } from './checkout.events';

let subject: Subject<any>;

describe('CheckoutEventCollector', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    eventService = TestBed.inject(EventService);
    subject = new Subject<any>();

    TestBed.inject(CheckoutEventCollector); // register events
  });

  describe('OrderPlacedEvent', () => {
    const eventData: OrderPlacedEvent = {
      code: 'code',
    };

    beforeEach(() => {
      subject = new Subject<any>();
      eventService.register(OrderPlacedEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService
        .get(TmsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      subject.next(eventData);
      expect(result).not.toBeUndefined();
      expect(result.event).toEqual(OrderPlacedEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });
});
