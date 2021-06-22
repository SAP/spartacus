import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCartFormType } from '@spartacus/cart/saved-cart/root';
import { Cart } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { SavedCartDetailsService } from '../saved-cart-details.service';
import { SavedCartDetailsActionComponent } from './saved-cart-details-action.component';

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
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedCartDetailsActionComponent],
      providers: [
        {
          provide: SavedCartDetailsService,
          useClass: MockSavedCartDetailsService,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCartDetailsActionComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'openDialog').and.stub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger an open dialog to delete a saved cart', () => {
    component.openDialog(mockSavedCart, SavedCartFormType.DELETE);

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.SAVED_CART,
      component.element,
      component['vcr'],
      {
        cart: mockSavedCart,
        layoutOption: SavedCartFormType.DELETE,
      }
    );
  });

  it('should trigger an open dialog to restore a saved cart', () => {
    component.openDialog(mockSavedCart, SavedCartFormType.RESTORE);

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.SAVED_CART,
      component.element,
      component['vcr'],
      {
        cart: mockSavedCart,
        layoutOption: SavedCartFormType.RESTORE,
      }
    );
  });
});
