import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  ClearCheckoutService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Translatable,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartFormLaunchDialogService } from '../../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
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

class MockSavedCartService implements Partial<SavedCartService> {
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

class MockSavedCartFormLaunchDialogService
  implements Partial<SavedCartFormLaunchDialogService> {
  openDialog(
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ): Observable<any> {
    return of();
  }
}

class MockClearCheckoutService implements Partial<ClearCheckoutService> {
  resetCheckoutProcesses(): void {}
}

describe('SavedCartDetailsActionComponent', () => {
  let component: SavedCartDetailsActionComponent;
  let fixture: ComponentFixture<SavedCartDetailsActionComponent>;
  let savedCartService: SavedCartService;
  let routingService: RoutingService;
  let savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService;
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
          provide: SavedCartService,
          useClass: MockSavedCartService,
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
          provide: SavedCartFormLaunchDialogService,
          useClass: MockSavedCartFormLaunchDialogService,
        },
        {
          provide: ClearCheckoutService,
          useClass: MockClearCheckoutService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCartDetailsActionComponent);
    component = fixture.componentInstance;

    savedCartService = TestBed.inject(SavedCartService);
    routingService = TestBed.inject(RoutingService);
    savedCartFormLaunchDialogService = TestBed.inject(
      SavedCartFormLaunchDialogService
    );
    clearCheckoutService = TestBed.inject(ClearCheckoutService);

    spyOn(savedCartService, 'restoreSavedCart').and.stub();
    spyOn(savedCartService, 'clearRestoreSavedCart').and.stub();
    spyOn(savedCartService, 'clearSaveCart').and.stub();
    spyOn(routingService, 'go').and.stub();
    spyOn(savedCartFormLaunchDialogService, 'openDialog').and.stub();
    spyOn(clearCheckoutService, 'resetCheckoutProcesses').and.stub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger a restore saved cart', () => {
    component.restoreSavedCart(mockCartId);
    expect(savedCartService.restoreSavedCart).toHaveBeenCalledWith(mockCartId);
  });

  it('should trigger onRestoreComplete when there was a successful restored cart', () => {
    spyOn(component, 'onRestoreComplete').and.stub();
    spyOn(
      savedCartService,
      'getRestoreSavedCartProcessSuccess'
    ).and.returnValue(of(true));

    component.ngOnInit();
    expect(component.onRestoreComplete).toHaveBeenCalled();
  });

  it('should trigger a redirection and a reset process onRestoreComplete', () => {
    component.onRestoreComplete(true);

    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'savedCarts' });
    expect(savedCartService.clearRestoreSavedCart).toHaveBeenCalled();
    expect(savedCartService.clearSaveCart).toHaveBeenCalled();
    expect(clearCheckoutService.resetCheckoutProcesses).toHaveBeenCalled();
  });

  it('should NOT trigger a redirection and a reset process onRestoreComplete', () => {
    component.onRestoreComplete(false);

    expect(routingService.go).not.toHaveBeenCalledWith({
      cxRoute: 'savedCarts',
    });
    expect(savedCartService.clearRestoreSavedCart).not.toHaveBeenCalled();
    expect(savedCartService.clearSaveCart).not.toHaveBeenCalled();
    expect(clearCheckoutService.resetCheckoutProcesses).not.toHaveBeenCalled();
  });

  it('should trigger an open dialog to delete a saved cart', () => {
    component.openDialog(mockSavedCart);

    expect(savedCartFormLaunchDialogService.openDialog).toHaveBeenCalledWith(
      component.element,
      component['vcr'],
      {
        cart: mockSavedCart,
        layoutOption: 'delete',
      }
    );
  });
});
