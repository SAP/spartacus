import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageType } from './../../routing/models/page-context.model';
import { ProductGuard } from './product.guard';
import { RoutingService } from '../../routing/facade/routing.service';
import { of } from 'rxjs';
import { ProductService } from '../facade/product.service';

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
