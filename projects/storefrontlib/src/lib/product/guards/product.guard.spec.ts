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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ProductGuard,
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: ProductService, useClass: MockProductService }
      ]
    });
  });
});
