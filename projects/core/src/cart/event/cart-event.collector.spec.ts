import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { TmsEvent } from '../../event';
import { EventService } from '../../event/event.service';
import { CartEventCollector } from './cart-event.collector';
import { CartAddEntryEvent, CartAddEntrySuccessEvent } from './cart.events';

let subject: BehaviorSubject<any>;

fdescribe('CartEventCollector', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    TestBed.inject(CartEventCollector); // register events
    eventService = TestBed.inject(EventService);
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
      subject = new BehaviorSubject<any>(eventData);
      eventService.register(CartAddEntryEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService.get(TmsEvent).subscribe((value) => (result = value));
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
      subject = new BehaviorSubject<any>(eventData);
      eventService.register(CartAddEntrySuccessEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService.get(TmsEvent).subscribe((value) => (result = value));
      expect(result.event).toEqual(CartAddEntrySuccessEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });
});
