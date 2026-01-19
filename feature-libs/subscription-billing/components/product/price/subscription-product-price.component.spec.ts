import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Product, TranslationService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import {
  OneTimeCharge,
  RecurringCharge,
  SubscriptionProductService,
} from '@spartacus/subscription-billing/root';
import { Observable, of } from 'rxjs';
import { SubscriptionProductPriceComponent } from './subscription-product-price.component';
const mockOneTime: OneTimeCharge[] = [{ name: 'one' }, { name: 'two' }];
const mockRecurring: RecurringCharge[] = [{ price: { value: 1 } }];
const mockProduct2 = {
  sapPricePlan: {
    oneTimeCharges: mockOneTime,
    recurringCharges: mockRecurring,
  },
};
const mockProduct1 = {
  sapPricePlan: {},
};
class MockSubscriptionProductService {
  isSubscription(_product: any) {
    return true;
  }
  getSubscriptionData(
    _productCode?: string
  ): Observable<Product | null | undefined> {
    return of(mockProduct2);
  }
}
class MockCurrentProductService {
  getProduct(_scopes: any) {
    return null;
  }
}
@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(_value: string): any {
    return '';
  }
}
class MockTranslateService implements Partial<TranslationService> {
  translate(
    _key: string | string[],
    _options?: any,
    _whitespaceUntilLoaded?: boolean
  ): Observable<string> {
    return of('');
  }
}

describe('SubscriptionProductPriceComponent', () => {
  let component: SubscriptionProductPriceComponent;
  let fixture: ComponentFixture<SubscriptionProductPriceComponent>;
  let productService: SubscriptionProductService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockTranslatePipe, SubscriptionProductPriceComponent],
      providers: [
        {
          provide: SubscriptionProductService,
          useClass: MockSubscriptionProductService,
        },
        { provide: CurrentProductService, useClass: MockCurrentProductService },
        { provide: TranslationService, useClass: MockTranslateService },
      ],
    }).compileComponents();
    productService = TestBed.inject(SubscriptionProductService);
  }));
  describe('for a null product', () => {
    beforeEach(() => {
      spyOn(productService, 'getSubscriptionData').and.returnValue(of(null));
      spyOn(productService, 'isSubscription').and.returnValue(true);
      fixture = TestBed.createComponent(SubscriptionProductPriceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should be created', () => {
      expect(component).toBeTruthy();
      expect(productService.getSubscriptionData).toHaveBeenCalled();
    });
    it('should return product status', () => {
      expect(component.isCurrentProductSubscription()).toEqual(false);
      expect(productService.isSubscription).not.toHaveBeenCalled();
    });
    it('should return one time charges', () => {
      expect(component.oneTimeCharges()).toEqual([]);
    });
    it('should return recurring charges', () => {
      expect(component.recurringCharges()).toEqual([]);
    });
  });
  describe('for a mock product without price plan', () => {
    beforeEach(() => {
      spyOn(productService, 'isSubscription').and.returnValue(true);
      spyOn(productService, 'getSubscriptionData').and.returnValue(
        of(mockProduct1)
      );
      fixture = TestBed.createComponent(SubscriptionProductPriceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should be created', () => {
      expect(component).toBeTruthy();
      expect(productService.getSubscriptionData).toHaveBeenCalled();
    });

    it('should return product status', () => {
      expect(component.isCurrentProductSubscription()).toEqual(true);
      expect(productService.isSubscription).toHaveBeenCalled();
    });
    it('should return one time charges', () => {
      expect(component.oneTimeCharges()).toEqual([]);
    });
    it('should return recurring charges', () => {
      expect(component.recurringCharges()).toEqual([]);
    });
  });
  describe('for a mock product with price plan', () => {
    beforeEach(() => {
      spyOn(productService, 'isSubscription').and.returnValue(true);
      spyOn(productService, 'getSubscriptionData').and.returnValue(
        of(mockProduct2)
      );
      fixture = TestBed.createComponent(SubscriptionProductPriceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should be created', () => {
      expect(component).toBeTruthy();
      expect(productService.getSubscriptionData).toHaveBeenCalled();
    });

    it('should return product status', () => {
      expect(component.isCurrentProductSubscription()).toEqual(true);
      expect(productService.isSubscription).toHaveBeenCalled();
    });
    it('should return one time charges', () => {
      expect(component.oneTimeCharges()).toEqual(mockOneTime);
    });
    it('should return recurring charges', () => {
      expect(component.recurringCharges()).toEqual(mockRecurring);
    });
  });
});
