import { TestBed } from '@angular/core/testing';
import { Product, ProductCatalogService } from '@spartacus/core';

const product: Product = { code: 'product1', name: 'Test Product 1' };

describe('ProductCatalogService', () => {
  let service: ProductCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCatalogService],
    });

    service = TestBed.inject(ProductCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if product is provided', () => {
    expect(service.isProductInCatalog(product)).toEqual(true);
  });

  it('should return false if product is not provided', () => {
    expect(service.isProductInCatalog(undefined)).toBeFalsy();
  });
});
