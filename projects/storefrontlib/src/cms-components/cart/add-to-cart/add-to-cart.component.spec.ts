import { Component, DebugElement, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  stock: { stockLevelStatus: 'inStock' },
};

const mockProduct2: Product = {
  name: 'mockProduct2',
  code: 'code2',
  stock: { stockLevelStatus: 'inStock' },
};

const mockNoStockProduct: Product = {
  name: 'mockProduct',
  code: 'code1',
  stock: { stockLevelStatus: 'outOfStock' },
};

class MockCartService {
  addEntry(_productCode: string, _quantity: number): void {}
  getEntry(_productCode: string): Observable<OrderEntry> {
    return of();
  }
  getAddEntryLoaded(): Observable<boolean> {
    return of(true);
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
  @Input() step;
  @Input() min;
  @Input() max;
  @Input() cartIsLoading;
  @Input() value;
}

describe('AddToCartComponent', () => {
  let addToCartComponent: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let cartService: CartService;
  let currentProductService: CurrentProductService;
  let el: DebugElement;

  let modalInstance: any;
  const mockCartEntry: OrderEntry = { entryNumber: 7 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SpinnerModule,
        I18nTestingModule,
      ],
      declarations: [AddToCartComponent, MockItemCounterComponent],
      providers: [
        { provide: ModalService, useValue: { open: () => {} } },
        { provide: CartService, useClass: MockCartService },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartComponent);
    addToCartComponent = fixture.componentInstance;
    cartService = TestBed.get(CartService as Type<CartService>);
    modalInstance = TestBed.get(ModalService as Type<ModalService>);
    currentProductService = TestBed.get(CurrentProductService as Type<
      CurrentProductService
    >);
    el = fixture.debugElement;

    spyOn(modalInstance, 'open').and.returnValue({ componentInstance: {} });
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(addToCartComponent).toBeTruthy();
  });

  describe('load cart entry', () => {
    beforeEach(() => {
      spyOn(cartService, 'getEntry').and.callThrough();
    });
    it('should load entry by product', () => {
      addToCartComponent.product = mockProduct;
      addToCartComponent.ngOnInit();
      expect(cartService.getEntry).toHaveBeenCalledWith(mockProduct.code);
    });

    it('should load entry by product code', () => {
      addToCartComponent.productCode = productCode;
      addToCartComponent.ngOnInit();
      expect(cartService.getEntry).toHaveBeenCalledWith(productCode);
    });

    it('should load entry by product code from currentProductService', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockProduct)
      );
      addToCartComponent.ngOnInit();
      expect(cartService.getEntry).toHaveBeenCalledWith(mockProduct.code);
    });
  });

  describe('stock info', () => {
    it('should have stock based on product', () => {
      addToCartComponent.product = {
        stock: { stockLevelStatus: 'inStock' },
      };
      addToCartComponent.ngOnInit();
      expect(addToCartComponent.hasStock).toEqual(true);
    });

    it('should not have stock based on product', () => {
      addToCartComponent.product = {
        stock: { stockLevelStatus: 'outOfStock' },
      };
      addToCartComponent.ngOnInit();
      expect(addToCartComponent.hasStock).toEqual(false);
    });

    it('should have stock based on current product', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of({
          stock: { stockLevelStatus: 'inStock' },
        })
      );
      addToCartComponent.ngOnInit();
      expect(addToCartComponent.hasStock).toEqual(true);
    });

    it('should not have stock based on current product', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of({
          stock: { stockLevelStatus: 'outOfStock' },
        })
      );
      addToCartComponent.ngOnInit();
      expect(addToCartComponent.hasStock).toEqual(false);
    });

    it('(not supported anymore) should always have stock based when productcode is passed', () => {
      addToCartComponent.productCode = '123';
      addToCartComponent.ngOnInit();
      expect(addToCartComponent.hasStock).toEqual(true);
    });
  });

  describe('Product from page', () => {
    it('should reset counter value when changing product', () => {
      const currentProduct = new BehaviorSubject<Product>(mockProduct);

      //Product 1
      spyOn(currentProductService, 'getProduct').and.returnValue(
        currentProduct
      );
      addToCartComponent.ngOnInit();
      expect(addToCartComponent.productCode).toEqual(mockProduct.code);
      addToCartComponent.quantity = 5;

      //Product 2
      currentProduct.next(mockProduct2);
      expect(addToCartComponent.productCode).toEqual(mockProduct2.code);
      //Quantity is expected to be reset to 1 since it is a new product page
      expect(addToCartComponent.quantity).toEqual(1);
    });

    it('should disable input when the product has no stock', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockNoStockProduct)
      );
      addToCartComponent.ngOnInit();
      expect(addToCartComponent.productCode).toEqual(mockProduct.code);
      expect(addToCartComponent.maxQuantity).toBe(undefined);
      expect(addToCartComponent.hasStock).toEqual(false);
    });
  });

  it('should call addToCart()', () => {
    addToCartComponent.productCode = productCode;
    addToCartComponent.ngOnInit();
    spyOn(cartService, 'addEntry').and.callThrough();
    spyOn(cartService, 'getEntry').and.returnValue(of(mockCartEntry));
    addToCartComponent.quantity = 1;

    addToCartComponent.addToCart();
    addToCartComponent.cartEntry$.subscribe();

    expect(modalInstance.open).toHaveBeenCalled();
    expect(cartService.addEntry).toHaveBeenCalledWith(productCode, 1);
  });

  describe('UI', () => {
    it('should show addToCart button with productCode input', () => {
      addToCartComponent.productCode = productCode;
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button')).nativeElement).toBeDefined();
    });

    it('should hide addToCart button with productCode input', () => {
      addToCartComponent.productCode = null;
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button'))).toBeNull();
    });

    it('should show the addToCart button for currentProduct', () => {
      addToCartComponent.productCode = null;
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockProduct)
      );
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button')).nativeElement).toBeDefined();
    });

    it('should hide the addToCart button for currentProduct', () => {
      addToCartComponent.productCode = null;
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockNoStockProduct)
      );
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button'))).toBeNull();
    });
  });
});
