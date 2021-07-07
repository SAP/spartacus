import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  Product,
  Translatable,
} from '@spartacus/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { QuickOrderService } from '../../core/services/quick-order.service';
import { QuickOrderFormComponent } from './quick-order-form.component';

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

class MockQuickOrderService implements Partial<QuickOrderService> {
  search(_code: any): Observable<Product> {
    return of(mockProduct);
  }
  productAdded$ = new Subject<void>();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

describe('QuickOrderFormComponent', () => {
  let component: QuickOrderFormComponent;
  let fixture: ComponentFixture<QuickOrderFormComponent>;
  let quickOrderService: QuickOrderService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [QuickOrderFormComponent],
      providers: [
        { provide: QuickOrderService, useClass: MockQuickOrderService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();

    quickOrderService = TestBed.inject(QuickOrderService);
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
      quickOrderService.productAdded$.next();

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
});
