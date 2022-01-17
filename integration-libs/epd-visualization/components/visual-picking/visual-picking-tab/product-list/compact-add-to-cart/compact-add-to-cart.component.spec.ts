import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
} from '@spartacus/core';
import {
  CurrentProductService,
  IconModule,
  ModalService,
  SpinnerModule,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CompactAddToCartComponent } from './compact-add-to-cart.component';

const productCode = '1234';

const mockProduct: Product = {
  name: 'mockProduct',
  code: 'code1',
  stock: {
    stockLevel: 333,
    stockLevelStatus: 'inStock',
  },
};

const mockNoStockProduct: Product = {
  name: 'mockProduct',
  code: 'code1',
  stock: { stockLevel: 0, stockLevelStatus: 'outOfStock' },
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
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() control: any;
}

describe('CompactAddToCartComponent', () => {
  let addToCartComponent: CompactAddToCartComponent;
  let fixture: ComponentFixture<CompactAddToCartComponent>;
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
          IconModule,
        ],
        declarations: [CompactAddToCartComponent, MockItemCounterComponent],
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
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactAddToCartComponent);
    addToCartComponent = fixture.componentInstance;
    service = TestBed.inject(ActiveCartService);
    modalInstance = TestBed.inject(ModalService);
    currentProductService = TestBed.inject(CurrentProductService);
    el = fixture.debugElement;

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
      expect(addToCartComponent.hasStock).toEqual(true);
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
      // addToCartComponent.productCode not set
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button'))).toBeNull();
    });

    it('should show the addToCart button for currentProduct', () => {
      // addToCartComponent.productCode not set
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockProduct)
      );
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button')).nativeElement).toBeDefined();
    });

    it('should hide the addToCart button for currentProduct', () => {
      // addToCartComponent.productCode not set
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockNoStockProduct)
      );
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button'))).toBeNull();
    });
  });
});
