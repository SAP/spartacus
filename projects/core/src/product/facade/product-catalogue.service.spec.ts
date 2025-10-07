import { TestBed } from '@angular/core/testing';
import { Product, ProductCatalogueService } from '@spartacus/core';

const product: Product = { code: 'product1', name: 'Test Product 1' };

describe('ProductCatalogueService', () => {
  let service: ProductCatalogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCatalogueService],
    });

    service = TestBed.inject(ProductCatalogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if product is provided', () => {
    expect(service.isProductInCatalogue(product)).toBeTruthy();
  });

  it('should return false if product is not provided', () => {
    expect(service.isProductInCatalogue(undefined)).toBeFalsy();
  });
});
