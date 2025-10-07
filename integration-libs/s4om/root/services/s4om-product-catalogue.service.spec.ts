import { TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { S4omProductCatalogueService } from '@spartacus/s4om/root';

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
  stock: {
    stockLevelStatus: 'low',
  },
};

describe('S4omProductCatalogueService', () => {
  let service: S4omProductCatalogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [S4omProductCatalogueService],
    });

    service = TestBed.inject(S4omProductCatalogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if product is not provided', () => {
    expect(service.isProductInCatalogue(undefined)).toBeFalsy();
  });

  it("should return false if product have 'notOrderable' stock level status", () => {
    expect(
      service.isProductInCatalogue(productWithSpecialStockLevelStatus)
    ).toBeFalsy();
  });

  it("should return true if product have stock level status other than 'notOrderable'", () => {
    expect(
      service.isProductInCatalogue(productWithOrdinaryStockLevelStatus)
    ).toBeTruthy();
  });

  it('should return true if product does not have stock level status', () => {
    expect(
      service.isProductInCatalogue(productWithoutStockLevelStatus)
    ).toBeTruthy();
  });
});
