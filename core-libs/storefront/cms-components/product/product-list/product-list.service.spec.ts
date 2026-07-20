import { TestBed } from '@angular/core/testing';
import { ProductListService } from './product-list.service';

describe('ProductListService', () => {
  let service: ProductListService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductListService],
    });
    service = TestBed.inject(ProductListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hide add to cart button when feature is enabled and product is not purchasable', () => {
    const product = { price: 100, purchasable: false };
    expect(service.shouldHideAddToCartButton(product)).toBe(true);
  });

  it('should hide add to cart button when feature is enabled and product price is not defined', () => {
    const product = { purchasable: true };
    expect(service.shouldHideAddToCartButton(product)).toBe(true);
  });

  it('should not hide add to cart button when feature is enabled and purchasable is not defined', () => {
    const product = { price: 100 };
    expect(service.shouldHideAddToCartButton(product)).toBe(false);
  });

  it('should not hide add to cart button when feature is disabled and product is purchasable', () => {
    const product = { price: 100, purchasable: true };
    expect(service.shouldHideAddToCartButton(product)).toBe(false);
  });
});
