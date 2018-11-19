import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductGuard } from './product.guard';
import { RoutingService, PageType, ProductService } from '@spartacus/core';
import { of } from 'rxjs';

class MockProductService {
  isProductLoaded() {}
}

const router = {
  state: {
    url: '/test',
    queryParams: {},
    params: { productCode: '123' },
    context: { id: 'testPageId', type: PageType.PRODUCT_PAGE }
  }
};
const mockRoutingService = {
  routerState$: of(router)
};
describe('ProductGuard', () => {
  let productGuard: ProductGuard;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ProductGuard,
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: ProductService, useClass: MockProductService }
      ]
    });

    productGuard = TestBed.get(ProductGuard);
    productService = TestBed.get(ProductService);
  });

  it('should activate route when product is loaded', () => {
    spyOn(productService, 'isProductLoaded').and.returnValue(of(true));
    productGuard.canActivate().subscribe(result => expect(result).toBeTruthy);
  });

  it('should not activate route when product is not loaded', () => {
    spyOn(productService, 'isProductLoaded').and.returnValue(of(false));
    productGuard.canActivate().subscribe(result => expect(result).toBeFalsy);
  });
});
