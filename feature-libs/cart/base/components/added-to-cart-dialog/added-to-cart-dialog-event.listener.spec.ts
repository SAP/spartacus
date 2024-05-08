import { AbstractType, ElementRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import {
  CxEvent,
  EventService,
  PointOfService,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { AddedToCartDialogEventListener } from './added-to-cart-dialog-event.listener';
import { OrderEntry } from '../../root/models';

const mockEventStream$ = new BehaviorSubject<CxEvent>({});
const mockEventSuccessStream$ = new BehaviorSubject<CxEvent>({});

class MockEventService implements Partial<EventService> {
  get<T>(eventType: AbstractType<T>): Observable<T> {
    if (
      eventType.name === CartUiEventAddToCart.type ||
      eventType.name === CartAddEntryFailEvent.type
    ) {
      return mockEventStream$.asObservable() as Observable<T>;
    } else {
      return mockEventSuccessStream$.asObservable() as Observable<T>;
    }
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
  closeDialog(_reason: string): void {}
}

const PRODUCT_CODE = 'productCode';
const STORE_NAME = 'storeName';
const STORE_NAME_FROM_POS = 'storeNameFromPoS';
const QUANTITY = 3;
const deliveryPointOfService: PointOfService = { name: STORE_NAME_FROM_POS };
const entry: OrderEntry = {
  quantity: 0,
};

const mockEvent = new CartUiEventAddToCart();
const mockSuccessEvent = new CartAddEntrySuccessEvent();
mockEvent.productCode = PRODUCT_CODE;
mockEvent.quantity = QUANTITY;
mockEvent.numberOfEntriesBeforeAdd = 1;
mockEvent.pickupStoreName = STORE_NAME;
mockSuccessEvent.productCode = PRODUCT_CODE;
mockSuccessEvent.quantity = QUANTITY;
mockSuccessEvent.entry = entry;

const mockFailEvent = new CartAddEntryFailEvent();
mockFailEvent.error = {};

describe('AddedToCartDialogEventListener', () => {
  let listener: AddedToCartDialogEventListener;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddedToCartDialogEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
    });

    launchDialogService = TestBed.inject(LaunchDialogService);
    entry.deliveryPointOfService = deliveryPointOfService;
  });

  describe('onAddToCart', () => {
    it('should open modal on event CartUiEventAddToCart', () => {
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(listener as any, 'openModal').and.stub();
      mockEventStream$.next(mockEvent);
      expect(listener['openModal']).toHaveBeenCalledWith(mockEvent);
    });


    it('should close modal on fail event', () => {
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(listener as any, 'closeModal').and.stub();
      mockEventStream$.next(mockFailEvent);
      expect(listener['closeModal']).toHaveBeenCalledWith(mockFailEvent);
    });
  });

  describe('openModal', () => {
    it('should open the add to cart dialog', () => {
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(launchDialogService, 'openDialog').and.callThrough();
      listener['openModal'](mockEvent);
      expect(launchDialogService.openDialog).toHaveBeenCalled();
    });
  });

  describe('closeModal', () => {
    it('should close the add to cart dialog', () => {
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(launchDialogService, 'closeDialog').and.stub();
      listener['closeModal']('reason');
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('reason');
    });
  });
});
