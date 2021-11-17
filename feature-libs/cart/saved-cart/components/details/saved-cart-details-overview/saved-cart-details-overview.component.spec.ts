import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Cart, I18nTestingModule, TranslationService } from '@spartacus/core';
import {
  CardModule,
  LaunchDialogService,
  LAUNCH_CALLER,
  IconTestingModule,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { SavedCartDetailsService } from '../saved-cart-details.service';
import { SavedCartDetailsOverviewComponent } from './saved-cart-details-overview.component';

const mockTranslations = 'saved-cart-translations';
const mockSavedCart: Cart = {
  name: 'test-cart-name',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  description: 'test-cart-description',
  saveTime: new Date('1994-01-11T00:00Z'),
  totalItems: 8,
  totalUnitCount: 3,
  totalPriceWithTax: {
    formattedValue: 'test-price-tax',
  },
};

class MockSavedCartDetailsService implements Partial<SavedCartDetailsService> {
  getCartDetails(): Observable<Cart> {
    return of(mockSavedCart);
  }
}

class MockTranslationService {
  translate(): Observable<string> {
    return of(mockTranslations);
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

describe('SavedCartDetailsOverviewComponent', () => {
  let component: SavedCartDetailsOverviewComponent;
  let fixture: ComponentFixture<SavedCartDetailsOverviewComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconTestingModule,
        CardModule,
        RouterTestingModule,
      ],
      declarations: [SavedCartDetailsOverviewComponent],
      providers: [
        {
          provide: SavedCartDetailsService,
          useClass: MockSavedCartDetailsService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCartDetailsOverviewComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(component, 'getCartName').and.callThrough();
    spyOn(component, 'getCartDescription').and.callThrough();
    spyOn(component, 'getCartId').and.callThrough();
    spyOn(component, 'getDateSaved').and.callThrough();
    spyOn(component, 'getCartItems').and.callThrough();
    spyOn(component, 'getCartQuantity').and.callThrough();
    spyOn(component, 'getCartTotal').and.callThrough();
    spyOn(launchDialogService, 'openDialog').and.stub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger getCartName(cartName: string)', () => {
    component
      .getCartName(mockSavedCart.name as string)
      .subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.title).toEqual(mockTranslations);
        expect(data.text).toEqual([mockSavedCart.name]);
      })
      .unsubscribe();

    expect(component.getCartName).toHaveBeenCalledWith(mockSavedCart.name);
  });

  it('should trigger getCartDescription(cartDescription: string)', () => {
    component
      .getCartDescription(mockSavedCart.description as string)
      .subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.title).toEqual(mockTranslations);
        expect(data.text).toEqual([mockSavedCart.description]);
      })
      .unsubscribe();

    expect(component.getCartDescription).toHaveBeenCalledWith(
      mockSavedCart.description
    );
  });

  it('should trigger getCartId(cartId: string)', () => {
    component
      .getCartId(mockSavedCart.code as string)
      .subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.title).toEqual(mockTranslations);
        expect(data.text).toEqual([mockSavedCart.code]);
      })
      .unsubscribe();

    expect(component.getCartId).toHaveBeenCalledWith(mockSavedCart.code);
  });

  it('should trigger getDateSaved(saveTime: string)', () => {
    const date = mockSavedCart.saveTime.toDateString();

    component
      .getDateSaved(date)
      .subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.title).toEqual(mockTranslations);
        expect(data.text).toEqual([date]);
      })
      .unsubscribe();

    expect(component.getDateSaved).toHaveBeenCalledWith(date);
  });

  it('should trigger getCartItems(totalItems: number)', () => {
    component
      .getCartItems(mockSavedCart.totalItems as number)
      .subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.title).toEqual(mockTranslations);
        expect(data.text).toEqual([mockSavedCart.totalItems?.toString()]);
      })
      .unsubscribe();

    expect(component.getCartItems).toHaveBeenCalledWith(
      mockSavedCart.totalItems
    );
  });

  it('should trigger getCartQuantity(totalItems: number)', () => {
    component
      .getCartQuantity(mockSavedCart.totalUnitCount as number)
      .subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.title).toEqual(mockTranslations);
        expect(data.text).toEqual([mockSavedCart.totalUnitCount?.toString()]);
      })
      .unsubscribe();

    expect(component.getCartQuantity).toHaveBeenCalledWith(
      mockSavedCart.totalUnitCount
    );
  });

  it('should trigger getCartTotal(totalPriceWithTax: string)', () => {
    component
      .getCartTotal(mockSavedCart.totalPriceWithTax?.formattedValue as string)
      .subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.title).toEqual(mockTranslations);
        expect(data.text).toEqual([
          mockSavedCart.totalPriceWithTax?.formattedValue,
        ]);
      })
      .unsubscribe();

    expect(component.getCartTotal).toHaveBeenCalledWith(
      mockSavedCart.totalPriceWithTax?.formattedValue
    );
  });

  it('should trigger an open dialog to delete a saved cart', () => {
    component.openDialog(mockSavedCart);

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.SAVED_CART,
      component.element,
      component['vcr'],
      {
        cart: mockSavedCart,
        layoutOption: 'edit',
      }
    );
  });
});
