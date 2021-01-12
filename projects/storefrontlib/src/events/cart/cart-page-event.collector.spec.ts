import { TestBed } from '@angular/core/testing';
import { EventService, TmsEvent } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartPageEventCollector } from './cart-page-event.collector';
import { CartPageEvent } from './cart-page.events';

let subject: Subject<any>;

describe('CartPageEventCollector', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    eventService = TestBed.inject(EventService);
    subject = new Subject<any>();

    TestBed.inject(CartPageEventCollector); // register events
  });

  describe('CartPageEvent', () => {
    const eventData: CartPageEvent = {
      context: { id: 'cart' },
      url: 'cart page url',
      params: {},
    };

    beforeEach(() => {
      subject = new Subject<any>();
      eventService.register(CartPageEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService
        .get(TmsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      subject.next(eventData);
      expect(result).not.toBeUndefined();
      expect(result.event).toEqual(CartPageEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });
});
