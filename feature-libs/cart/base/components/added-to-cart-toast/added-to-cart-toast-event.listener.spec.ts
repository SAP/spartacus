import { TestBed } from '@angular/core/testing';
import {
  ADDED_TO_CART_FEEDBACK,
  CartConfig,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AddedToCartToastEventListener } from './added-to-cart-toast-event.listener';

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
  addToast: (_event: CartUiEventAddToCart) => {},
};

const mockToastRef = { instance: mockInstance };

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  launch(): Observable<any> {
    return of(mockToastRef);
  }
}

const mockCartConfig: CartConfig = {
  cart: {
    addToCartFeedback: {
      feedback: ADDED_TO_CART_FEEDBACK.TOAST,
      toast: { timeout: 3000 },
    },
  },
};

describe('AddedToCartToastEventListener', () => {
  let listener: AddedToCartToastEventListener;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddedToCartToastEventListener,
        { provide: EventService, useClass: MockEventService },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: CartConfig,
          useValue: mockCartConfig,
        },
      ],
    });

    listener = TestBed.inject(AddedToCartToastEventListener);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  describe('onAddToCart', () => {
    it('should open toast on event', () => {
      spyOn(listener as any, 'addToast').and.stub();
      mockEventStream$.next(mockEvent);
      expect(listener['addToast']).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('addToast', () => {
    it('should add a toast', () => {
      spyOn(launchDialogService, 'launch').and.callThrough();
      spyOn(mockInstance, 'addToast').and.stub();
      listener['component'] = undefined;
      listener['addToast'](mockEvent);
      expect(launchDialogService.launch).toHaveBeenCalled();
      expect(mockInstance.addToast).toHaveBeenCalledWith(mockEvent);
    });
  });
});
