import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  QuickOrderFacade,
  QuickOrderConfig,
} from '@spartacus/cart/quick-order/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  Product,
  Translatable,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { QuickOrderFormComponent } from './quick-order-form.component';
import { FormErrorsModule } from '@spartacus/storefront';
import { ChangeDetectorRef, Component, Input } from '@angular/core';

const mockProductCode: string = 'mockCode';
const mockProductCode2: string = 'mockCode2';
const mockProductCode3: string = 'mockCode3';
const mockProduct: Product = {
  code: mockProductCode,
};
const mockProduct2: Product = {
  code: mockProductCode2,
};
const mockProduct3: Product = {
  code: mockProductCode3,
};
const mockNonPurchasableProduct: Product = {
  code: mockProductCode,
  multidimensional: true,
};
const mockEvent = { preventDefault() {} } as Event;
const mockResultsProductElement = {
  className: 'quick-order-form-reset-icon',
} as Element;
const mockResetIconElement = {
  className: 'quick-order-form-reset-icon',
} as Element;
const mockEmptyElement = {} as Element;
const mockCanAdd$ = new BehaviorSubject<boolean>(true);

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
  searchProducts(_query: string, _maxProducts?: number): Observable<Product[]> {
    return of([mockProduct]);
  }
  setProductAdded(_productCode: string): void {}
  getProductAdded(): Subject<string> {
    return new Subject<string>();
  }
  addProduct(_product: Product): void {}
  canAdd(_code?: string): Observable<boolean> {
    return mockCanAdd$.asObservable();
  }
  setNonPurchasableProductError(_product: Product): void {}
  clearNonPurchasableProductError(): void {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

describe('QuickOrderFormComponent', () => {
  let component: QuickOrderFormComponent;
  let fixture: ComponentFixture<QuickOrderFormComponent>;
  let quickOrderService: QuickOrderFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      declarations: [QuickOrderFormComponent, MockCxIconComponent],
      providers: [
        ChangeDetectorRef,
        WindowRef,
        QuickOrderConfig,
        { provide: QuickOrderFacade, useClass: MockQuickOrderFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();

    quickOrderService = TestBed.inject(QuickOrderFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form with default values', () => {
    expect(component.form?.get('product')?.value).toEqual(null);
  });

  describe('on add method', () => {
    it('should trigger addProduct', () => {
      spyOn(quickOrderService, 'addProduct').and.callThrough();
      spyOn(
        quickOrderService,
        'clearNonPurchasableProductError'
      ).and.callThrough();
      component.add(mockProduct, mockEvent);

      expect(
        quickOrderService.clearNonPurchasableProductError
      ).toHaveBeenCalled();
      expect(quickOrderService.addProduct).toHaveBeenCalledWith(mockProduct);
    });

    it('should not trigger addProduct because of non purchasable product', () => {
      spyOn(component, 'clear').and.callThrough();
      spyOn(quickOrderService, 'addProduct').and.callThrough();
      spyOn(
        quickOrderService,
        'setNonPurchasableProductError'
      ).and.callThrough();
      component.add(mockNonPurchasableProduct, mockEvent);

      expect(quickOrderService.addProduct).not.toHaveBeenCalledWith(
        mockProduct
      );
      expect(
        quickOrderService.setNonPurchasableProductError
      ).toHaveBeenCalledWith(mockNonPurchasableProduct);
      expect(component.clear).toHaveBeenCalled();
    });
  });

  describe('should add new product on addProduct method', () => {
    beforeEach(() => {
      mockCanAdd$.next(true);
      fixture.detectChanges();
    });

    it('first on the list', () => {
      spyOn(component, 'add').and.callThrough();
      component.setResults([mockProduct]);
      component.addProduct(mockEvent);

      expect(component.add).toHaveBeenCalledWith(mockProduct, mockEvent);
    });

    it('with active index from the list', () => {
      spyOn(component, 'add').and.callThrough();
      component.setResults([mockProduct, mockProduct2]);
      component.setFocusedElementIndex(1);
      component.addProduct(mockEvent);

      expect(component.add).toHaveBeenCalledWith(mockProduct2, mockEvent);
    });
  });

  it('should set focused element and then get index', () => {
    component.setFocusedElementIndex(1);
    expect(component.getFocusedElementIndex()).toEqual(1);
  });

  it('should get information if results box is open and set results', () => {
    component.setResults([mockProduct, mockProduct2, mockProduct3]);

    expect(component.isResultsBoxOpen()).toBeTruthy();
  });

  describe('on blur', () => {
    beforeEach(() => {
      component.setResults([mockProduct, mockProduct2, mockProduct3]);
    });

    it('should trigger close and clear results', () => {
      component.onBlur();

      expect(component.isResultsBoxOpen()).toBeFalsy();
    });

    it('should not trigger close and clear results as we click on results products box', () => {
      component.onBlur(mockResultsProductElement);

      expect(component.isResultsBoxOpen()).toBeTruthy();
    });

    it('should not trigger close and clear results as we click on reset icon', () => {
      component.onBlur(mockResetIconElement);

      expect(component.isResultsBoxOpen()).toBeTruthy();
    });

    it('should trigger close and clear results as element is empty object', () => {
      component.onBlur(mockEmptyElement);

      expect(component.isResultsBoxOpen()).toBeFalsy();
    });
  });

  describe('should trigger focusNextChild method', () => {
    describe('and focus next child', () => {
      beforeEach(() => {
        component.setResults([mockProduct, mockProduct2, mockProduct3]);
      });

      it('next on the list', () => {
        component.setFocusedElementIndex(1);
        component.focusNextChild();

        expect(component.getFocusedElementIndex()).toEqual(2);
      });

      it('first element as previously was last on the list', () => {
        component.setFocusedElementIndex(2);
        component.focusNextChild();

        expect(component.getFocusedElementIndex()).toEqual(0);
      });

      it('first element as previously was null', () => {
        component.setFocusedElementIndex(null);
        component.focusNextChild();

        expect(component.getFocusedElementIndex()).toEqual(0);
      });
    });

    it('and do nothing as results box is close', () => {
      component.setFocusedElementIndex(0);
      component.focusNextChild();

      expect(component.getFocusedElementIndex()).toEqual(0);
    });
  });

  describe('should trigger focusPreviousChild method', () => {
    describe('and focus previous child', () => {
      beforeEach(() => {
        component.setResults([mockProduct, mockProduct2, mockProduct3]);
      });

      it('previous on the list', () => {
        component.setFocusedElementIndex(1);
        component.focusPreviousChild();

        expect(component.getFocusedElementIndex()).toEqual(0);
      });

      it('last element as previously was first on the list', () => {
        component.setFocusedElementIndex(0);
        component.focusPreviousChild();

        expect(component.getFocusedElementIndex()).toEqual(2);
      });

      it('last element as previously was null', () => {
        component.setFocusedElementIndex(null);
        component.focusPreviousChild();

        expect(component.getFocusedElementIndex()).toEqual(2);
      });
    });

    it('and do nothing as results box is close', () => {
      component.setFocusedElementIndex(2);
      component.focusPreviousChild();

      expect(component.getFocusedElementIndex()).toEqual(2);
    });
  });

  describe('should trigger clear', () => {
    describe('on click', () => {
      beforeEach(() => {
        component.setResults([mockProduct]);
      });

      it('if form has value', () => {
        component.form?.get('product')?.setValue('test');
        component.clear();

        expect(component.form.get('product')?.value).toBeNull();
        expect(component.isResultsBoxOpen()).toBeFalsy();
      });
    });

    it('and do nothing as results box is not open', () => {
      component.form?.get('product')?.setValue('test');
      component.clear();

      expect(component.form.get('product')?.value).toEqual('test');
    });

    it('on product added', () => {
      quickOrderService.setProductAdded(mockProductCode);

      expect(component.form.get('product')?.value).toBeNull();
      expect(component.isResultsBoxOpen()).toBeFalsy();
    });

    it('and trigger prevent default', () => {
      const ev = {
        preventDefault() {},
      };
      spyOn(ev, 'preventDefault').and.callThrough();

      component.form?.get('product')?.setValue('test');
      component.clear(ev as Event);
      expect(ev.preventDefault).toHaveBeenCalled();
    });
  });

  describe('should verify list limit', () => {
    it('and allow to add new product', () => {
      mockCanAdd$.next(true);
      fixture.detectChanges();

      let result;
      component.canAddProduct().subscribe((canAdd) => (result = canAdd));
      expect(result).toBeTruthy();
    });

    it('and not allow to add new product', () => {
      mockCanAdd$.next(false);
      fixture.detectChanges();

      let result;
      component.canAddProduct().subscribe((canAdd) => (result = canAdd));
      expect(result).toBeFalsy();
    });
  });
});
