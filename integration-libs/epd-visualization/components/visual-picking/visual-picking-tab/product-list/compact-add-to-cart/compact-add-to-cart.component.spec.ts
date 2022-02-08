import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartFacade,
  ADD_TO_CART_FEATURE,
  Cart,
  OrderEntry,
} from '@spartacus/cart/base/root';
import {
  CmsComponent,
  FeatureModulesService,
  I18nTestingModule,
  Product,
} from '@spartacus/core';
import {
  CmsComponentData,
  CurrentProductService,
  IconModule,
  ModalService,
  SpinnerModule,
} from '@spartacus/storefront';
import { AddedToCartDialogEventListener } from 'feature-libs/cart/base/components/added-to-cart-dialog';
import { Observable, of } from 'rxjs';
import { CompactAddToCartComponent } from './compact-add-to-cart.component';

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of({}),
  uid: 'test',
};

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

class MockFeatureModulesService {
  public features: string[] = [];

  isConfigured(featureName: string): boolean {
    return this.features.includes(featureName);
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
  let service: ActiveCartFacade;
  let currentProductService: CurrentProductService;
  let el: DebugElement;
  let listener: AddedToCartDialogEventListener;
  let mockFeatureModulesService: MockFeatureModulesService =
    new MockFeatureModulesService();

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
          { provide: ActiveCartFacade, useClass: MockActiveCartService },
          {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
          },
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
          {
            provide: FeatureModulesService,
            useValue: mockFeatureModulesService,
          },
          AddedToCartDialogEventListener,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactAddToCartComponent);
    addToCartComponent = fixture.componentInstance;
    service = TestBed.inject(ActiveCartFacade);
    currentProductService = TestBed.inject(CurrentProductService);
    listener = TestBed.inject(AddedToCartDialogEventListener);
    el = fixture.debugElement;

    spyOn(listener as any, 'openModal').and.stub();

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

    expect(service.addEntry).toHaveBeenCalledWith(productCode, 1);
    expect(listener['openModal']).toHaveBeenCalledTimes(1);
  });

  describe('UI', () => {
    it('should show addToCart button when productCode property set and addToCart feature configured', () => {
      addToCartComponent.productCode = productCode;
      mockFeatureModulesService.features = [ADD_TO_CART_FEATURE];
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button')).nativeElement).toBeDefined();
    });

    it('should hide addToCart button when productCode property not set and current product not retrieved', () => {
      // addToCartComponent.productCode not set
      mockFeatureModulesService.features = [ADD_TO_CART_FEATURE];
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button'))).toBeNull();
    });

    it('should show the button when current product has product code and addToCart feature configured', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockProduct)
      );
      mockFeatureModulesService.features = [ADD_TO_CART_FEATURE];
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button')).nativeElement).toBeDefined();
    });

    it('should hide the button when addToCart feature not configured', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockProduct)
      );
      mockFeatureModulesService.features = [];
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button'))).toBeNull();
    });

    it('should hide the button when no stock', () => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockNoStockProduct)
      );
      addToCartComponent.ngOnInit();
      fixture.detectChanges();
      expect(el.query(By.css('button'))).toBeNull();
    });
  });
});
