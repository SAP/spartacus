import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { EventService } from '../../../event/event.service';
import { testActionToEventMapping } from '../../../state/event/testing-utils/test-action-to-event-mapping';
import { createFrom } from '../../../util/create-from';
import { CartActions } from '../../store/actions';
import { MultiCartEventBuilder } from './multi-cart-event.builder';
import { MultiCartAddEntryEvent } from './multi-cart.events';

const MOCK_CART_EVENT = {
  cartId: 'cartId',
  userId: 'userId',
};

describe('MultiCartEventBuilder', () => {
  let eventService: EventService;
  let actions$: ActionsSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: new Subject() }],
    });

    eventService = TestBed.inject(EventService);
    actions$ = TestBed.inject(ActionsSubject);

    TestBed.inject(MultiCartEventBuilder); // register events
  });

  describe('should register event', () => {
    it('MultiCartAddEntryEvent', () => {
      const data: Required<MultiCartAddEntryEvent> = {
        ...MOCK_CART_EVENT,
        productCode: 'productCode',
        quantity: 123,
      };

      testActionToEventMapping({
        action: new CartActions.CartAddEntry(data),
        event: createFrom(MultiCartAddEntryEvent, data),
        eventService,
        actions$,
      });
    });
  });
});
