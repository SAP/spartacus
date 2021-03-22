import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cart, I18nTestingModule, TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartFormLaunchDialogService } from '../../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
import { SavedCartDetailService } from '../saved-cart-detail.service';
import { SavedCartDetailOverviewComponent } from './saved-cart-detail-overview.component';

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

class MockSavedCartDetailService implements Partial<SavedCartDetailService> {
  getCartDetails(): Observable<Cart> {
    return of(mockSavedCart);
  }
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

class MockTranslationService {
  translate(): Observable<string> {
    return of(mockTranslations);
  }
}

describe('SavedCartDetailOverviewComponent', () => {
  let component: SavedCartDetailOverviewComponent;
  let fixture: ComponentFixture<SavedCartDetailOverviewComponent>;

  let savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SavedCartDetailOverviewComponent],
      providers: [
        {
          provide: SavedCartDetailService,
          useClass: MockSavedCartDetailService,
        },
        {
          provide: SavedCartFormLaunchDialogService,
          useClass: MockSavedCartFormLaunchDialogService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCartDetailOverviewComponent);
    component = fixture.componentInstance;

    savedCartFormLaunchDialogService = TestBed.inject(
      SavedCartFormLaunchDialogService
    );

    spyOn(component, 'getCartName').and.callThrough();
    spyOn(component, 'getCartDescription').and.callThrough();
    spyOn(component, 'getCartId').and.callThrough();
    spyOn(component, 'getDateSaved').and.callThrough();
    spyOn(component, 'getCartItems').and.callThrough();
    spyOn(component, 'getCartQuantity').and.callThrough();
    spyOn(component, 'getCartTotal').and.callThrough();
    spyOn(savedCartFormLaunchDialogService, 'openDialog').and.stub();

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
    const date = component['getDate'](mockSavedCart.saveTime as Date);

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

    expect(savedCartFormLaunchDialogService.openDialog).toHaveBeenCalledWith(
      component.element,
      component['vcr'],
      {
        cart: mockSavedCart,
        layoutOption: 'edit',
      }
    );
  });
});
