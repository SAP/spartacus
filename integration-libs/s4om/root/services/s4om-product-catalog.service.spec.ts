import { TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { S4omProductCatalogService } from '@spartacus/s4om/root';

const productWithSpecialStockLevelStatus: Product = {
  code: 'product1',
  name: 'Test Product 1',
  stock: {
    stockLevelStatus: 'notOrderable',
  },
};

const productWithOrdinaryStockLevelStatus: Product = {
  code: 'product1',
  name: 'Test Product 1',
  stock: {
    stockLevelStatus: 'low',
  },
};

const productWithoutStockLevelStatus: Product = {
  code: 'product1',
  name: 'Test Product 1',
};

describe('S4omProductCatalogService', () => {
  let service: S4omProductCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [S4omProductCatalogService],
    });

    service = TestBed.inject(S4omProductCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if product is not provided', () => {
    expect(service.isProductInCatalog(undefined)).toBeFalsy();
  });

  it("should return false if product have 'notOrderable' stock level status", () => {
    expect(
      service.isProductInCatalog(productWithSpecialStockLevelStatus)
    ).toBeFalsy();
  });

  it("should return true if product have stock level status other than 'notOrderable'", () => {
    expect(
      service.isProductInCatalog(productWithOrdinaryStockLevelStatus)
    ).toBeTruthy();
  });

  it('should return true if product does not have stock level status', () => {
    expect(
      service.isProductInCatalog(productWithoutStockLevelStatus)
    ).toBeTruthy();
  });
});
