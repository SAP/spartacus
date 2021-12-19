import { TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  CartAddEntrySuccessEvent,
} from '@spartacus/cart/main/root';
import { CxEvent, EventService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cart, OrderEntry } from '../../root/models/cart.model';
import { AddToCartDialogEventListener } from './add-to-cart-dialog-event.listener';

const mockEventStream$ = new BehaviorSubject<CxEvent>({});

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getLastEntry(_productCode: string): Observable<OrderEntry | undefined> {
    return of({});
  }
  getActive(): Observable<Cart> {
    return of({});
  }
  isStable(): Observable<boolean> {
    return of(true);
  }
  getEntry(_productCode: string): Observable<OrderEntry | undefined> {
    return of({});
  }
}

describe('AddToCartDialogEventListener', () => {
  let activeCartFacade: ActiveCartFacade;
  //let eventService: EventService;
  let listener: AddToCartDialogEventListener;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddToCartDialogEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
        {
          provide: ModalService,
          useValue: { open: () => ({ componentInstance: {} }) },
        },
      ],
    });

    listener = TestBed.inject(AddToCartDialogEventListener);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    //eventService = TestBed.inject(EventService);
  });

  describe('onAddToCart', () => {
    it('Should test something', () => {
      spyOn(listener as any, 'openModal').and.stub();
      const event = new CartAddEntrySuccessEvent();
      mockEventStream$.next(event);
      expect(listener['openModal']).toHaveBeenCalled();
      console.log(activeCartFacade, event);
    });
  });
  describe('openModal', () => {
    it('Should test something', () => {
      console.log(activeCartFacade);
    });
  });
});
