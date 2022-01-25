import { TestBed } from '@angular/core/testing';
import {
  CartAddEntryFailEvent,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AddedToCartDialogEventListener } from './added-to-cart-dialog-event.listener';

const mockEventStream$ = new BehaviorSubject<CxEvent>({});

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
}

const mockEvent = new CartUiEventAddToCart();
mockEvent.productCode = 'test';
mockEvent.quantity = 3;
mockEvent.numberOfEntriesBeforeAdd = 1;

const mockFailEvent = new CartAddEntryFailEvent();
mockFailEvent.error = {};

const mockInstance = {
  entry$: of({}),
  cart$: of({}),
  loaded$: of({}),
  addedEntryWasMerged$: of({}),
  quantity: 0,
  init: (
    _productCode: string,
    _quantity: number,
    _numberOfEntriesBeforeAdd: number
  ) => {},
  dismissModal: (_reason?: any) => {},
};

const mockModalRef = { componentInstance: mockInstance };
class MockModalService {
  open() {
    return mockModalRef;
  }
  getActiveModal() {
    return mockModalRef;
  }
}

describe('AddToCartDialogEventListener', () => {
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
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    });

    listener = TestBed.inject(AddedToCartDialogEventListener);
    modalService = TestBed.inject(ModalService);
  });

  describe('onAddToCart', () => {
    it('Should open modal on event', () => {
      spyOn(listener as any, 'openModal').and.stub();
      mockEventStream$.next(mockEvent);
      expect(listener['openModal']).toHaveBeenCalledWith(mockEvent);
    });

    it('Should close modal on fail event', () => {
      spyOn(listener as any, 'closeModal').and.stub();
      mockEventStream$.next(mockFailEvent);
      expect(listener['closeModal']).toHaveBeenCalledWith(mockFailEvent);
    });
  });

  describe('openModal', () => {
    it('Should open the add to cart dialog', () => {
      spyOn(modalService, 'open').and.callThrough();
      spyOn(mockInstance, 'init').and.stub();
      listener['openModal'](mockEvent);
      expect(modalService.open).toHaveBeenCalled();
      expect(mockInstance.init).toHaveBeenCalledWith(
        mockEvent.productCode,
        mockEvent.quantity,
        mockEvent.numberOfEntriesBeforeAdd
      );
    });
  });

  describe('closeModal', () => {
    it('Should close the add to cart dialog', () => {
      spyOn(mockInstance, 'dismissModal').and.stub();
      listener['closeModal'](mockFailEvent);
      expect(mockInstance.dismissModal).toHaveBeenCalledWith(
        mockFailEvent.error
      );
    });

    it('Should do nothing if the active modal is not the cart dialog', () => {
      spyOn(modalService, 'getActiveModal').and.returnValue(null);
      spyOn(mockInstance, 'dismissModal').and.stub();
      listener['closeModal'](mockFailEvent);
      expect(mockInstance.dismissModal).not.toHaveBeenCalledWith(
        mockFailEvent.error
      );
    });
  });
});
