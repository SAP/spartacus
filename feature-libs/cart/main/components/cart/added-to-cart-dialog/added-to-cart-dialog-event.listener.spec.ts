import { TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  CartUiEventAddToCart,
} from '@spartacus/cart/main/root';
import { CxEvent, EventService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cart, OrderEntry } from '../../../root/models/cart.model';
import { AddedToCartDialogEventListener } from './added-to-cart-dialog-event.listener';

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

const mockEvent = new CartUiEventAddToCart();
mockEvent.productCode = 'test';
mockEvent.quantity = 3;

const mockInstance = {
  entry$: of({}),
  cart$: of({}),
  loaded$: of({}),
  addedEntryWasMerged$: of({}),
  quantity: 0,
};

describe('AddToCartDialogEventListener', () => {
  let activeCartFacade: ActiveCartFacade;
  let listener: AddedToCartDialogEventListener;
  let modalService: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddedToCartDialogEventListener,
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
          useValue: { open: () => ({ componentInstance: mockInstance }) },
        },
      ],
    });

    listener = TestBed.inject(AddedToCartDialogEventListener);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    modalService = TestBed.inject(ModalService);
  });

  describe('onAddToCart', () => {
    it('Should test something', () => {
      spyOn(listener as any, 'openModal').and.stub();
      mockEventStream$.next(mockEvent);
      expect(listener['openModal']).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('openModal', () => {
    it('Should open the add to cart dialog', () => {
      spyOn(modalService, 'open').and.callThrough();
      spyOn(activeCartFacade, 'getLastEntry').and.callThrough();
      spyOn(activeCartFacade, 'isStable').and.callThrough();
      spyOn(activeCartFacade, 'getEntry').and.callThrough();

      listener['openModal'](mockEvent);
      expect(modalService.open).toHaveBeenCalled();
      expect(activeCartFacade.getLastEntry).toHaveBeenCalled();
      expect(activeCartFacade.isStable).toHaveBeenCalled();
      expect(activeCartFacade.getEntry).toHaveBeenCalled();
    });
  });
});
