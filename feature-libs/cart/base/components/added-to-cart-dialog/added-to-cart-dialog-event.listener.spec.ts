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

const mockEvent = new CartUiEventAddToCart();
const mockSuccessEvent = new CartAddEntrySuccessEvent();
mockEvent.productCode = 'test';
mockEvent.quantity = 3;
mockEvent.numberOfEntriesBeforeAdd = 1;
mockEvent.pickupStoreName = 'testStore';

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
    it('should open modal on event CartAddEntrySuccessEvent in case the toggle is active', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(listener as any, 'openModalAfterSuccess').and.stub();
      mockEventSuccessStream$.next(mockSuccessEvent);
      expect(listener['openModalAfterSuccess']).toHaveBeenCalledWith(
        mockSuccessEvent
      );
    });

    it('should not open modal on event CartAddEntrySuccessEvent in case the toggle is inactive', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(listener as any, 'openModalAfterSuccess').and.stub();
      mockEventSuccessStream$.next(mockSuccessEvent);
      expect(listener['openModalAfterSuccess']).not.toHaveBeenCalled();
    });

    it('should open modal on event CartUiEventAddToCart in case the toggle is inactive', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
      listener = TestBed.inject(AddedToCartDialogEventListener);
      spyOn(listener as any, 'openModal').and.stub();
      mockEventStream$.next(mockEvent);
      expect(listener['openModal']).toHaveBeenCalledWith(mockEvent);
    });

    it('should not open modal on event CartUiEventAddToCart in case the toggle is active', () => {
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
});
