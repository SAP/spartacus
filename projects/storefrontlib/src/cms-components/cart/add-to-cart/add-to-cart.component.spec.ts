import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  Cart,
  I18nTestingModule,
  OrderEntry,
  Product,
  CmsAddToCartComponent,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ModalService } from '../../../shared/components/modal/index';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { CurrentProductService } from '../../product';
import { AddToCartComponent } from './add-to-cart.component';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';


const config$ = new BehaviorSubject<CmsAddToCartComponent>({
  inventoryDisplay: false,
});

const toggleInventoryDisplay = <CmsComponentData<any>>{
  data$: config$.asObservable(),
};

const productCode = '1234';

const mockProduct: Product = {
  name: 'mockProduct',
  code: 'code1',
  stock: {
    stockLevel: 0,
    stockLevelStatus: 'inStock',
  },
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

class MockActiveCartService {
  addEntry(_productCode: string, _quantity: number): void {}
  getEntry(_productCode: string): Observable<OrderEntry> {
    return of();
  }
  isStable(): Observable<boolean> {
    return of();
  }
  getActive(): Observable<Cart> {
    return of();
  }
  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }
  getLastEntry(_productCode: string): Observable<OrderEntry> {
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

fdescribe('AddToCartComponent', () => {
  let addToCartComponent: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let service: ActiveCartService;
  let currentProductService: CurrentProductService;
  let el: DebugElement;

  let modalInstance: any;
  const mockCartEntry: OrderEntry = { entryNumber: 7 };

  beforeEach(
    waitForAsync(() => {
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
          {
            provide: ModalService,
            useValue: { open: () => ({ componentInstance: {} }) },
          },
          { provide: ActiveCartService, useClass: MockActiveCartService },
          {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
          },
          {
            provide: CmsComponentData,
            useValue: toggleInventoryDisplay,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartComponent);
    addToCartComponent = fixture.componentInstance;
    service = TestBed.inject(ActiveCartService);
    modalInstance = TestBed.inject(ModalService);
    currentProductService = TestBed.inject(CurrentProductService);
    el = fixture.debugElement;

    config$.next({
      inventoryDisplay: false,
    });

    spyOn(modalInstance, 'open').and.callThrough();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(addToCartComponent).toBeTruthy();
  });

  describe('Product code provided', () => {
    it('should call ngOnInit()', () => {
      addToCartComponent.productCode = productCode;
      addToCartComponent.ngOnInit();
      expect(addToCartComponent.hasStock).toBe(true);
      expect(addToCartComponent.quantity).toBe(1);
    });

    it('should load entry by product code from currentProductService', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockProduct)
      );
      addToCartComponent.ngOnInit();
      expect(addToCartComponent.productCode).toEqual(mockProduct.code);
      expect(addToCartComponent.maxQuantity).toEqual(
        mockProduct.stock.stockLevel
      );
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
      expect(addToCartComponent.maxQuantity).toBe(0);
      expect(addToCartComponent.hasStock).toEqual(false);
    });
  });

  it('should call addToCart()', () => {
    addToCartComponent.productCode = productCode;
    addToCartComponent.ngOnInit();
    spyOn(service, 'addEntry').and.callThrough();
    spyOn(service, 'getEntries').and.returnValue(of([mockCartEntry]));
    spyOn(service, 'isStable').and.returnValue(of(true));
    addToCartComponent.quantity = 1;

    addToCartComponent.addToCart();

    expect(modalInstance.open).toHaveBeenCalled();
    expect(service.addEntry).toHaveBeenCalledWith(productCode, 1);
    expect(
      addToCartComponent.modalRef.componentInstance.numberOfEntriesBeforeAdd
    ).toBe(1);
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

  it('should hide quantity if showQuantity is set to false', () => {
    addToCartComponent.showQuantity = false;
    fixture.detectChanges();
    const quantityEl = el.query(By.css('.quantity'));
    expect(quantityEl).toBeNull();
  });

  describe('Inventory Display test', () => {
    let currentMockProduct: Product = {
      name: 'mockProduct',
      code: 'code1',
      stock: undefined,
    };

    it('should display inventory quantity when enabled', () => {
      currentMockProduct.stock = {
        stockLevel: 333,
        stockLevelStatus: 'inStock',
      };

      config$.next({
        inventoryDisplay: true,
      });

      addToCartComponent.productCode = productCode;
      addToCartComponent.product = currentMockProduct;
      addToCartComponent.ngOnInit();
      fixture.detectChanges();

      expect(el.query(By.css('.info')).nativeElement.innerText.trim()).toEqual(
        currentMockProduct.stock?.stockLevel + ' addToCart.inStock'
      );
    });

    it('should NOT display inventory when disabled', () => {
      currentMockProduct.stock = {
        stockLevel: 333,
        stockLevelStatus: 'inStock',
      };

      addToCartComponent.productCode = productCode;
      addToCartComponent.product = currentMockProduct;
      addToCartComponent.ngOnInit();
      fixture.detectChanges();

      expect(el.query(By.css('.info')).nativeElement.innerText.trim()).toEqual(
        'addToCart.inStock'
      );
    });

    it('should display out of stock inventory when enabled and out of stock', () => {
      currentMockProduct.stock = {
        stockLevel: 0,
        stockLevelStatus: 'outOfStock',
      };

      config$.next({
        inventoryDisplay: true,
      });

      addToCartComponent.productCode = productCode;
      addToCartComponent.product = currentMockProduct;
      addToCartComponent.ngOnInit();
      fixture.detectChanges();

      expect(el.query(By.css('.info')).nativeElement.innerText.trim()).toEqual(
        'addToCart.outOfStock'
      );
    });

    it('should display out of stock when inventory display disabled', () => {
      currentMockProduct.stock = {
        stockLevel: 0,
        stockLevelStatus: 'outOfStock',
      };

      addToCartComponent.productCode = productCode;
      addToCartComponent.product = currentMockProduct;
      addToCartComponent.ngOnInit();
      fixture.detectChanges();

      expect(el.query(By.css('.info')).nativeElement.innerText.trim()).toEqual(
        'addToCart.outOfStock'
      );
    });

    it('should display `In Stock` when product forced in stock status and inventory display enabled', () => {
      currentMockProduct.stock = {
        stockLevelStatus: 'inStock',
      };

      config$.next({
        inventoryDisplay: true,
      });

      addToCartComponent.productCode = productCode;
      addToCartComponent.product = currentMockProduct;
      addToCartComponent.ngOnInit();
      fixture.detectChanges();

      expect(el.query(By.css('.info')).nativeElement.innerText.trim()).toEqual(
        'addToCart.inStock'
      );
    });
  });
});
