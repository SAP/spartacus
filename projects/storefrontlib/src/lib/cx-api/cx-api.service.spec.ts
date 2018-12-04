import { TestBed, inject } from '@angular/core/testing';
import { CxApiService } from './cx-api.service';

import {
  ProductReviewService,
  ProductSearchService,
  ProductService,
  RoutingService,
  LanguageService,
  CurrencyService
} from '@spartacus/core';
import { AuthService } from '../auth/facade/auth.service';
import { CmsService } from '../cms/facade/cms.service';

class MockAuthService {}
class MockCmsService {}
class MockRoutingService {}
class MockCurrencyService {}
class MockLanguageService {}
class MockProductService {}
class MockProductSearchService {}
class MockProductReviewService {}

describe('CxApiService', () => {
  let authService: AuthService;
  let cmsService: CmsService;
  let routingService: RoutingService;
  let currencyService: CurrencyService;
  let languageService: LanguageService;
  let productService: ProductService;
  let productSearchService: ProductSearchService;
  let productReviewService: ProductReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CxApiService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: ProductService, useClass: MockProductService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: ProductReviewService, useClass: MockProductReviewService }
      ]
    });

    authService = TestBed.get(AuthService);
    cmsService = TestBed.get(CmsService);
    routingService = TestBed.get(RoutingService);
    currencyService = TestBed.get(CurrencyService);
    languageService = TestBed.get(LanguageService);
    productService = TestBed.get(ProductService);
    productSearchService = TestBed.get(ProductSearchService);
    productReviewService = TestBed.get(ProductReviewService);
  });

  it('should be created', inject([CxApiService], (service: CxApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should provide specific facades', inject(
    [CxApiService],
    (service: CxApiService) => {
      expect(service.auth).toEqual(authService);
      expect(service.cms).toEqual(cmsService);
      expect(service.routing).toEqual(routingService);
      expect(service.currency).toEqual(currencyService);
      expect(service.language).toEqual(languageService);
      expect(service.product).toEqual(productService);
      expect(service.productSearch).toEqual(productSearchService);
      expect(service.productReview).toEqual(productReviewService);
    }
  ));
});
