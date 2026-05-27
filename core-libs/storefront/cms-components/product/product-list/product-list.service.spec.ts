import { TestBed } from '@angular/core/testing';
import { FeatureConfigService } from '@spartacus/core';
import { ProductListService } from './product-list.service';

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled(_feature: string): boolean {
    return true;
  }
}

describe('ProductListService', () => {
  let service: ProductListService;
  let featureConfigService: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductListService,
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });
    service = TestBed.inject(ProductListService);
    featureConfigService = TestBed.inject(FeatureConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hide add to cart button when feature is enabled and product is not purchasable', () => {
    spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
    const product = { price: 100, purchasable: false };
    expect(service.shouldHideAddToCartButton(product)).toBe(true);
  });

  it('should hide add to cart button when feature is enabled and product price is not defined', () => {
    spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
    const product = { purchasable: true };
    expect(service.shouldHideAddToCartButton(product)).toBe(true);
  });

  it('should not hide add to cart button when feature is enabled and purchasable is not defined', () => {
    spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
    const product = { price: 100 };
    expect(service.shouldHideAddToCartButton(product)).toBe(false);
  });

  it('should not hide add to cart button when feature is disabled and product is purchasable', () => {
    spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
    const product = { price: 100, purchasable: true };
    expect(service.shouldHideAddToCartButton(product)).toBe(false);
  });
});
