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
import { By } from '@angular/platform-browser';

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

  function getFocusedElement(): HTMLElement {
    return <HTMLElement>document.activeElement;
  }

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
      component.results = [mockProduct];

      component.addProduct(mockEvent);

      expect(component.add).toHaveBeenCalledWith(mockProduct, mockEvent);
    });
  });

  it('with not trigger addProduct on input enter with more than one product in results list', () => {
    spyOn(component, 'add').and.callThrough();
    component.results = [mockProduct, mockProduct2];

    component.addProduct(mockEvent);

    expect(component.add).not.toHaveBeenCalled();
  });

  it('should get information if results box is open and set results', () => {
    component.results = [mockProduct, mockProduct2, mockProduct3];
    component.open();

    expect(component.isResultsBoxOpen()).toBeTruthy();
  });

  describe('should trigger clear', () => {
    describe('on click', () => {
      beforeEach(() => {
        component.results = [mockProduct];
      });

      it('if form has value', () => {
        component.form?.get('product')?.setValue('test');
        component.open();
        component.clear();

        expect(component.form.get('product')?.value).toBeNull();
        expect(component.isResultsBoxOpen()).toBeFalsy();
      });
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

  it('should not change focus on focusNextChild if results list is empty', () => {
    const inputSearch: HTMLElement = fixture.debugElement.query(
      By.css('.quick-order-form-input > input')
    ).nativeElement;
    inputSearch.focus();

    component.focusNextChild(new UIEvent('keydown.arrowdown'));
    expect(inputSearch).toBe(getFocusedElement());
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
