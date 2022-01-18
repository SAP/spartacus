import { TestBed } from '@angular/core/testing';
import { CartUiEventAddToCart } from '@spartacus/cart/main/root';
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
};

fdescribe('AddToCartDialogEventListener', () => {
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
          useValue: { open: () => ({ componentInstance: mockInstance }) },
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
});
