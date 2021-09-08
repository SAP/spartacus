import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  Product,
  Translatable,
} from '@spartacus/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { QuickOrderFormComponent } from './quick-order-form.component';
import { FormErrorsModule } from '@spartacus/storefront';
import { Component, Input } from '@angular/core';

const mockProductCode: string = 'mockCode';
const mockProduct: Product = {
  code: mockProductCode,
};
const mockError = {
  status: 400,
  error: {
    errors: [
      {
        message: `Product with code '${mockProductCode}' not found!`,
      },
    ],
  },
};

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
  search(_code: any): Observable<Product> {
    return of(mockProduct);
  }
  setProductAdded(_productCode: string): void {}
  getProductAdded(): Subject<string> {
    return new Subject<string>();
  }
  addProduct(_product: Product): void {}
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
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      declarations: [QuickOrderFormComponent, MockCxIconComponent],
      providers: [
        { provide: QuickOrderFacade, useClass: MockQuickOrderFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();

    quickOrderService = TestBed.inject(QuickOrderFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
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

  it('should trigger product search', () => {
    spyOn(quickOrderService, 'search').and.callThrough();
    component.form.get('product')?.setValue(mockProductCode);
    component.search();

    expect(quickOrderService.search).toHaveBeenCalledWith(mockProductCode);
  });

  describe('should clear form', () => {
    it('on click', () => {
      component.clear();

      expect(component.form.get('product')?.value).toBeNull();
    });

    it('on product added', () => {
      quickOrderService.setProductAdded(mockProductCode);

      expect(component.form.get('product')?.value).toBeNull();
    });
  });

  it('should show global message on product search with error', () => {
    spyOn(globalMessageService, 'add').and.stub();
    spyOn(quickOrderService, 'search').and.returnValue(throwError(mockError));

    component.form.get('product')?.setValue(mockProductCode);
    component.search();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      mockError.error.errors[0].message,
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should disable form control with isDisabled flag', () => {
    component.isDisabled = true;
    expect(component.form.get('product')?.disabled).toBeTruthy();
  });

  it('should disable form control with isLoading flag', () => {
    component.isLoading = true;
    expect(component.form.get('product')?.disabled).toBeTruthy();
  });
});
