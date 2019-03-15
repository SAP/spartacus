import { TestBed, inject } from '@angular/core/testing';

import { CxApiService } from './cx-api.service';
import { AuthService } from '../auth/index';
import { CmsService } from '../cms/index';
import { RoutingService } from '../routing/index';
import { LanguageService, CurrencyService } from '../site-context/index';
import {
  ProductService,
  ProductSearchService,
  ProductReviewService
} from '../product/index';
import { TranslationService } from '../i18n/translation.service';

class MockAuthService {}
class MockCmsService {}
class MockRoutingService {}
class MockCurrencyService {}
class MockLanguageService {}
class MockProductService {}
class MockProductSearchService {}
class MockProductReviewService {}
class MockTranslationService {}

describe('CxApiService', () => {
  let authService: AuthService;
  let cmsService: CmsService;
  let routingService: RoutingService;
  let currencyService: CurrencyService;
  let languageService: LanguageService;
  let productService: ProductService;
  let productSearchService: ProductSearchService;
  let productReviewService: ProductReviewService;
  let translationService: MockTranslationService;

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
        { provide: ProductReviewService, useClass: MockProductReviewService },
        { provide: TranslationService, useClass: MockTranslationService }
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
    translationService = TestBed.get(TranslationService);
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
      expect(service.translation).toEqual(translationService);
    }
  ));
});
