import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  ClearCheckoutService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Translatable,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { SavedCartDetailsService } from '../saved-cart-details.service';
import { SavedCartDetailsActionComponent } from './saved-cart-details-action.component';

const mockCartId = 'test-cart';
const mockSavedCart: Cart = {
  name: 'test-cart-name',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  description: 'test-cart-description',
};

class MockSavedCartDetailsService implements Partial<SavedCartDetailsService> {
  getCartDetails(): Observable<Cart> {
    return of();
  }
}

class MockSavedCartFacade implements Partial<SavedCartFacade> {
  restoreSavedCart(_cartId: string): void {}
  getRestoreSavedCartProcessSuccess(): Observable<boolean> {
    return of();
  }
  deleteSavedCart(_cartId: string): void {}
  clearRestoreSavedCart(): void {}
  clearSaveCart(): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go(): void {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

class MockClearCheckoutService implements Partial<ClearCheckoutService> {
  resetCheckoutProcesses(): void {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return of();
  }
}

describe('SavedCartDetailsActionComponent', () => {
  let component: SavedCartDetailsActionComponent;
  let fixture: ComponentFixture<SavedCartDetailsActionComponent>;
  let savedCartFacade: SavedCartFacade;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;
  let clearCheckoutService: ClearCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedCartDetailsActionComponent],
      providers: [
        {
          provide: SavedCartDetailsService,
          useClass: MockSavedCartDetailsService,
        },
        {
          provide: SavedCartFacade,
          useClass: MockSavedCartFacade,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: ClearCheckoutService,
          useClass: MockClearCheckoutService,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCartDetailsActionComponent);
    component = fixture.componentInstance;

    savedCartFacade = TestBed.inject(SavedCartFacade);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    clearCheckoutService = TestBed.inject(ClearCheckoutService);

    spyOn(savedCartFacade, 'restoreSavedCart').and.stub();
    spyOn(savedCartFacade, 'clearRestoreSavedCart').and.stub();
    spyOn(savedCartFacade, 'clearSaveCart').and.stub();
    spyOn(routingService, 'go').and.stub();
    spyOn(launchDialogService, 'openDialog').and.stub();
    spyOn(clearCheckoutService, 'resetCheckoutProcesses').and.stub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger a restore saved cart', () => {
    component.restoreSavedCart(mockCartId);
    expect(savedCartFacade.restoreSavedCart).toHaveBeenCalledWith(mockCartId);
  });

  it('should trigger onRestoreComplete when there was a successful restored cart', () => {
    spyOn(component, 'onRestoreComplete').and.stub();
    spyOn(savedCartFacade, 'getRestoreSavedCartProcessSuccess').and.returnValue(
      of(true)
    );

    component.ngOnInit();
    expect(component.onRestoreComplete).toHaveBeenCalled();
  });

  it('should trigger a redirection and a reset process onRestoreComplete', () => {
    component.onRestoreComplete(true);

    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'savedCarts' });
    expect(savedCartFacade.clearRestoreSavedCart).toHaveBeenCalled();
    expect(savedCartFacade.clearSaveCart).toHaveBeenCalled();
    expect(clearCheckoutService.resetCheckoutProcesses).toHaveBeenCalled();
  });

  it('should NOT trigger a redirection and a reset process onRestoreComplete', () => {
    component.onRestoreComplete(false);

    expect(routingService.go).not.toHaveBeenCalledWith({
      cxRoute: 'savedCarts',
    });
    expect(savedCartFacade.clearRestoreSavedCart).not.toHaveBeenCalled();
    expect(savedCartFacade.clearSaveCart).not.toHaveBeenCalled();
    expect(clearCheckoutService.resetCheckoutProcesses).not.toHaveBeenCalled();
  });

  it('should trigger an open dialog to delete a saved cart', () => {
    component.openDialog(mockSavedCart);

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.SAVED_CART,
      component.element,
      component['vcr'],
      {
        cart: mockSavedCart,
        layoutOption: 'delete',
      }
    );
  });
});
