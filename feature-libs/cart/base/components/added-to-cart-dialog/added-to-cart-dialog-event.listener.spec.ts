import { AbstractType, ElementRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { CxEvent, EventService, FeatureConfigService } from '@spartacus/core';
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

const entry: OrderEntry = { quantity: 0 };

const mockEvent = new CartUiEventAddToCart();
const mockSuccessEvent = new CartAddEntrySuccessEvent();
mockEvent.productCode = 'test';
mockEvent.quantity = 3;
mockEvent.numberOfEntriesBeforeAdd = 1;
mockEvent.pickupStoreName = 'testStore';
mockSuccessEvent.entry = entry;

const mockFailEvent = new CartAddEntryFailEvent();
mockFailEvent.error = {};

describe('AddedToCartDialogEventListener', () => {
  let listener: AddedToCartDialogEventListener;
  let launchDialogService: LaunchDialogService;
  let featureConfigService: FeatureConfigService;

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

    featureConfigService = TestBed.inject(FeatureConfigService);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  describe('onAddToCart', () => {
    it('should open modal on event CartAddEntrySuccessEvent in case toggle adddedToCartDialogDrivenBySuccessEvent is active', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(listener as any, 'openModalAfterSuccess').and.stub();
      mockEventSuccessStream$.next(mockSuccessEvent);
      expect(listener['openModalAfterSuccess']).toHaveBeenCalledWith(
        mockSuccessEvent
      );
    });

    it('should not open modal on event CartAddEntrySuccessEvent in case toggle adddedToCartDialogDrivenBySuccessEvent is inactive', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(listener as any, 'openModalAfterSuccess').and.stub();
      mockEventSuccessStream$.next(mockSuccessEvent);
      expect(listener['openModalAfterSuccess']).not.toHaveBeenCalled();
    });

    it('should open modal on event CartUiEventAddToCart in case toggle adddedToCartDialogDrivenBySuccessEvent is inactive', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(listener as any, 'openModal').and.stub();
      mockEventStream$.next(mockEvent);
      expect(listener['openModal']).toHaveBeenCalledWith(mockEvent);
    });

    it('should not open modal on event CartUiEventAddToCart in case toggle adddedToCartDialogDrivenBySuccessEvent is active', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(listener as any, 'openModal').and.stub();
      mockEventStream$.next(mockEvent);
      expect(listener['openModal']).not.toHaveBeenCalled();
    });

    it('should close modal on fail event in case toggle is inactive', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
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

  describe('calculateEntryWasMerged', () => {
    it('should return true in case no quantityAdded is present (which happens if no stock is available)', () => {
      mockSuccessEvent.quantityAdded = undefined;
      expect(listener['calculateEntryWasMerged'](mockSuccessEvent)).toBe(true);
    });

    it('should return true in case the resulting entries quantity exceeds the quantity that was added to the cart', () => {
      mockSuccessEvent.quantityAdded = 1;
      entry.quantity = 2;
      expect(listener['calculateEntryWasMerged'](mockSuccessEvent)).toBe(true);
    });

    it('should return false in case the resulting entries quantity equals the quantity that was added to the cart', () => {
      mockSuccessEvent.quantityAdded = 3;
      entry.quantity = 3;
      expect(listener['calculateEntryWasMerged'](mockSuccessEvent)).toBe(false);
    });

    it('should return false in case the resulting entries quantity is undefined (which can happen only in exceptional situations) ', () => {
      mockSuccessEvent.quantityAdded = 1;
      entry.quantity = undefined;
      expect(listener['calculateEntryWasMerged'](mockSuccessEvent)).toBe(false);
    });
  });
});
