import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SubscriptionProductPriceComponent } from './subscription-product-price.component';
import { SubscriptionProductService } from '../services/subscription-product.service';
import { CurrentProductService } from '@spartacus/storefront';
import { Pipe, PipeTransform } from '@angular/core';
import { ProductScope } from '@spartacus/core';
import { OneTimeCharge, RecurringCharge } from '../../model';

class MockSubscriptionProductService {
  isSubscription(_product: any) {
    return true;
  }
}
class MockCurrentProductService {
  getProduct(_scopes: any) {
    return null;
  }
}
@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(_value: string): any {
    return '';
  }
}

const mockOneTime: OneTimeCharge[] = [{ name: 'one' }, { name: 'two' }];
const mockRecurring: RecurringCharge[] = [{ price: { value: 1 } }];
const mockProduct1 = {
  sapPricePlan: {
    oneTimeCharges: mockOneTime,
    recurringCharges: mockRecurring,
  },
};
const mockProduct2 = {
  sapPricePlan: {},
};

describe('SubscriptionProductPriceComponent', () => {
  let component: SubscriptionProductPriceComponent;
  let fixture: ComponentFixture<SubscriptionProductPriceComponent>;
  let currentProductService: CurrentProductService;
  let productService: SubscriptionProductService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [SubscriptionProductPriceComponent, MockTranslatePipe],
      providers: [
        {
          provide: SubscriptionProductService,
          useClass: MockSubscriptionProductService,
        },
        { provide: CurrentProductService, useClass: MockCurrentProductService },
      ],
    }).compileComponents();

    productService = TestBed.inject(SubscriptionProductService);
    currentProductService = TestBed.inject(CurrentProductService);
    spyOn(currentProductService, 'getProduct').and.returnValue(null);
    fixture = TestBed.createComponent(SubscriptionProductPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(currentProductService.getProduct).toHaveBeenCalledWith([
      ProductScope.SUBSCRIPTION,
    ]);
  });

  it('should check if product is subscription', () => {
    spyOn(productService, 'isSubscription').and.returnValue(true);
    let result = component.isCurrentProductSubscription({});
    expect(result).toEqual(true);
    expect(productService.isSubscription).toHaveBeenCalled();
  });

  it('should return one time charges', () => {
    expect(component.getOneTimeCharges(mockProduct1)).toEqual(mockOneTime);
    expect(component.getOneTimeCharges(mockProduct2)).toEqual([]);
  });
  it('should return recurring charges', () => {
    expect(component.getRecurringCharges(mockProduct1)).toEqual(mockRecurring);
    expect(component.getRecurringCharges(mockProduct2)).toEqual([]);
  });
});
