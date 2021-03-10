import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Translatable,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartService } from '../../../core/services/saved-cart.service';
import { SavedCartFormLaunchDialogService } from '../../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
import { SavedCartDetailService } from '../saved-cart-detail.service';
import { SavedCartDetailActionComponent } from './saved-cart-detail-action.component';

const mockCartId = 'test-cart';
const mockSavedCart: Cart = {
  name: 'test-cart-name',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  description: 'test-cart-description',
};

class MockSavedCartDetailService implements Partial<SavedCartDetailService> {
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

describe('SavedCartDetailActionComponent', () => {
  let component: SavedCartDetailActionComponent;
  let fixture: ComponentFixture<SavedCartDetailActionComponent>;
  let savedCartService: SavedCartService;
  let routingService: RoutingService;
  let savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedCartDetailActionComponent],
      providers: [
        {
          provide: SavedCartDetailService,
          useClass: MockSavedCartDetailService,
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCartDetailActionComponent);
    component = fixture.componentInstance;

    savedCartService = TestBed.inject(SavedCartService);
    routingService = TestBed.inject(RoutingService);
    savedCartFormLaunchDialogService = TestBed.inject(
      SavedCartFormLaunchDialogService
    );

    spyOn(savedCartService, 'restoreSavedCart').and.stub();
    spyOn(savedCartService, 'clearRestoreSavedCart').and.stub();
    spyOn(routingService, 'go').and.stub();
    spyOn(savedCartFormLaunchDialogService, 'openDialog').and.stub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger a restore saved cart', () => {
    component.restoreSavedCart(mockCartId);
    expect(savedCartService.restoreSavedCart).toHaveBeenCalledWith(mockCartId);
  });

  it('should trigger onSuccess when there was a successful restored cart', () => {
    spyOn(component, 'onSuccess').and.stub();
    spyOn(
      savedCartService,
      'getRestoreSavedCartProcessSuccess'
    ).and.returnValue(of(true));

    component.ngOnInit();
    expect(component.onSuccess).toHaveBeenCalled();
  });

  it('should trigger a redirection and a reset process onSuccess', () => {
    component.onSuccess(true);

    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'savedCarts' });
    expect(savedCartService.clearRestoreSavedCart).toHaveBeenCalled();
  });

  it('should NOT trigger a redirection and a reset process onSuccess', () => {
    component.onSuccess(false);

    expect(routingService.go).not.toHaveBeenCalledWith({
      cxRoute: 'savedCarts',
    });
    expect(savedCartService.clearRestoreSavedCart).not.toHaveBeenCalled();
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
