import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Cart,
  CartService,
  I18nTestingModule,
  OrderEntry,
  Product,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ModalService } from '../../../shared/components/modal/index';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { CurrentProductService } from '../../product';
import { AddToCartComponent } from './add-to-cart.component';

const productCode = '1234';
const mockProduct: Product = {
  name: 'mockProduct',
  code: 'code1',
  stock: { stockLevelStatus: 'inStock', stockLevel: 20 },
};
const mockProduct2: Product = {
  name: 'mockPrduct2',
  code: 'code2',
  stock: { stockLevelStatus: 'inStock', stockLevel: 12 },
};

const mockNoStockProduct: Product = {
  name: 'mockProduct',
  code: 'code1',
  stock: { stockLevelStatus: 'outOfStock', stockLevel: 0 },
};

class MockCartService {
  addEntry(_productCode: string, _quantity: number): void {}
  getEntry(_productCode: string): Observable<OrderEntry> {
    return of();
  }
  getLoaded(): Observable<boolean> {
    return of();
  }
  getActive(): Observable<Cart> {
    return of();
  }
}

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

@Component({
  template: '',
  selector: 'cx-item-counter',
})
class MockItemCounterComponent {
  @Input() min;
  @Input() max;
  @Input() step;
  @Input() control;
}

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let service: CartService;
  let currentProductService: CurrentProductService;
  let modalInstance: any;
  const mockCartEntry: OrderEntry = { entryNumber: 7 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SpinnerModule,
        I18nTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [AddToCartComponent, MockItemCounterComponent],
      providers: [
        { provide: ModalService, useValue: { open: () => {} } },
        { provide: CartService, useClass: MockCartService },
        { provide: CurrentProductService, useClass: MockCurrentProductService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CartService as Type<CartService>);
    modalInstance = TestBed.get(ModalService as Type<ModalService>);
    currentProductService = TestBed.get(CurrentProductService as Type<
      CurrentProductService
    >);

    spyOn(modalInstance, 'open').and.returnValue({ componentInstance: {} });
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Product code provided', () => {
    it('should call ngOnInit()', () => {
      component.productCode = productCode;
      spyOn(service, 'getEntry').and.returnValue(of(mockCartEntry));
      component.ngOnInit();
      let result: OrderEntry;
      component.cartEntry$.subscribe(entry => (result = entry));
      expect(result).toEqual(mockCartEntry);
    });
  });

  describe('Product from page', () => {
    it('should load product from service', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockProduct)
      );
      component.ngOnInit();
      expect(component.productCode).toEqual(mockProduct.code);
      expect(component.maxQuantity).toEqual(mockProduct.stock.stockLevel);
      expect(component.hasStock).toEqual(true);
    });

    it('should reset counter value when changing product', () => {
      const currentProduct = new BehaviorSubject<Product>(mockProduct);

      //Product 1
      spyOn(currentProductService, 'getProduct').and.returnValue(
        currentProduct
      );
      component.ngOnInit();
      expect(component.productCode).toEqual(mockProduct.code);
      component.quantity = 5;

      //Product 2
      currentProduct.next(mockProduct2);
      expect(component.productCode).toEqual(mockProduct2.code);
      //Quantity is expected to be reset to 1 since it is a new product page
      expect(component.quantity).toEqual(1);
    });

    it('should disable input when the product has no stock', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockNoStockProduct)
      );
      component.ngOnInit();
      expect(component.productCode).toEqual(mockProduct.code);
      expect(component.maxQuantity).toBe(undefined);
      expect(component.hasStock).toEqual(false);
    });
  });

  it('should call addToCart()', () => {
    component.productCode = productCode;
    component.ngOnInit();
    spyOn(service, 'addEntry').and.callThrough();
    spyOn(service, 'getEntry').and.returnValue(of(mockCartEntry));
    component.quantity = 1;

    component.addToCart();
    component.cartEntry$.subscribe();

    expect(modalInstance.open).toHaveBeenCalled();
    expect(service.addEntry).toHaveBeenCalledWith(productCode, 1);
  });

  it('should hide quantity if showQuantity is set to false', () => {
    component.showQuantity = false;
    fixture.detectChanges();
    const el = fixture.debugElement;
    const quantityEl = el.query(By.css('.quantity'));
    expect(quantityEl).toBeNull();
  });
});
