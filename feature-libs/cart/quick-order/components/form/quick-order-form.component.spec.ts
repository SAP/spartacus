import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule, Product } from '@spartacus/core';
import { Observable, of, Subject } from 'rxjs';
import { QuickOrderService } from '../../core/services/quick-order.service';
import { QuickOrderFormComponent } from './quick-order-form.component';

const mockProductCode: string = 'mockCode';
const mockProduct: Product = {
  code: mockProductCode,
};

class MockQuickOrderService implements Partial<QuickOrderService> {
  search(_code: any): Observable<Product> {
    return of(mockProduct);
  }
  productAdded$ = new Subject<void>();
}

describe('QuickOrderFormComponent', () => {
  let component: QuickOrderFormComponent;
  let fixture: ComponentFixture<QuickOrderFormComponent>;
  let quickOrderService: QuickOrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [QuickOrderFormComponent],
      providers: [
        { provide: QuickOrderService, useClass: MockQuickOrderService },
      ],
    }).compileComponents();

    quickOrderService = TestBed.inject(QuickOrderService);
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
    spyOn(quickOrderService, 'search');
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
});
