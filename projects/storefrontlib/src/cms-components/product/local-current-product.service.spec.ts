import { TestBed } from '@angular/core/testing';
import {
  Product,
  ProductScope,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LocalCurrentProductService } from './local-current-product.service';

const mockProduct: Product = { name: 'mockProduct', code: 'A123' };

const mockProductWithAttributes: Product = {
  ...mockProduct,
  classifications: [{}],
};

class MockProductService {
  get(_code: string, scope?: string): Observable<Product> {
    if (scope && scope === 'attributes') {
      return of(mockProductWithAttributes);
    }
    return of(mockProduct);
  }
}
class MockRoutingService {}

describe('LocalCurrentProductService', () => {
  let localCurrentProductService: LocalCurrentProductService;

  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LocalCurrentProductService,
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    localCurrentProductService = TestBed.inject(LocalCurrentProductService);
    localCurrentProductService.setCode(mockProduct.code);

    productService = TestBed.inject(ProductService);

    spyOn(productService, 'get').and.callThrough();
  });

  it('should emit product data', () => {
    let result: Product;

    localCurrentProductService
      .getProduct()
      .subscribe((product) => (result = product))
      .unsubscribe();

    expect(result).toEqual(mockProduct);
  });

  it('should emit product with attributes', () => {
    let result: Product;
    localCurrentProductService
      .getProduct(ProductScope.ATTRIBUTES)
      .subscribe((product) => (result = product))
      .unsubscribe();
    expect(result).toEqual(mockProductWithAttributes);
  });
});
