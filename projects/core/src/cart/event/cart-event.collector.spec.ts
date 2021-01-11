import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TmsEvent } from '../../event';
import { EventService } from '../../event/event.service';
import { CartEventCollector } from './cart-event.collector';
import { CartAddEntryEvent, CartAddEntrySuccessEvent } from './cart.events';

let subject: Subject<any>;

fdescribe('CartEventCollector', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    eventService = TestBed.inject(EventService);
    subject = new Subject<any>();

    TestBed.inject(CartEventCollector); // register events
  });

  describe('CartAddEntryEvent', () => {
    const eventData: CartAddEntryEvent = {
      cartId: 'mockCartId',
      cartCode: 'mockCartCode',
      userId: 'mockUserId',
      productCode: 'mockProductCode',
      quantity: 123,
    };

    beforeEach(() => {
      subject = new Subject<any>();
      eventService.register(CartAddEntryEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService
        .get(TmsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      subject.next(eventData);
      expect(result).not.toBeUndefined();
      expect(result.event).toEqual(CartAddEntryEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });

  describe('CartAddEntrySuccessEvent', () => {
    const eventData: CartAddEntrySuccessEvent = {
      cartId: 'mockCartId',
      cartCode: 'mockCartCode',
      userId: 'mockUserId',
      productCode: 'mockProductCode',
      quantity: 123,
      entry: undefined,
      quantityAdded: 1,
      deliveryModeChanged: false,
    };

    beforeEach(() => {
      subject = new Subject<any>();
      eventService.register(CartAddEntrySuccessEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService
        .get(TmsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      subject.next(eventData);
      expect(result).not.toBeUndefined();
      expect(result.event).toEqual(CartAddEntrySuccessEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });
});
