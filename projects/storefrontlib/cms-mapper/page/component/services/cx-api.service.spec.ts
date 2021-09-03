import { inject, TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  AuthService,
  BaseSiteService,
  CmsService,
  CurrencyService,
  FeatureConfigService,
  GlobalMessageService,
  LanguageService,
  OccEndpointsService,
  PageMetaService,
  ProductReferenceService,
  ProductReviewService,
  ProductSearchService,
  ProductService,
  RoutingService,
  SearchboxService,
  SelectiveCartService,
  TranslationService,
  UserAddressService,
  UserConsentService,
  UserInterestsService,
  UserNotificationPreferenceService,
  UserOrderService,
  UserPaymentService,
  UserService,
} from '@spartacus/core';
import { CxApiService } from './cx-api.service';

class MockAuthService {}
class MockActiveCartService {}
class MockCmsService {}
class MockPageMetaService {}
class MockFeatureConfigService {}
class MockGlobalMessageService {}
class MockTranslationService {}
class MockOccEndpointsService {}
class MockProductService {}
class MockProductSearchService {}
class MockProductReviewService {}
class MockProductReferenceService {}
class MockSearchboxService {}
class MockRoutingService {}
class MockCurrencyService {}
class MockLanguageService {}
class MockBaseSiteService {}
class MockUserService {}
class MockUserAddressService {}
class MockUserConsentService {}
class MockUserOrderService {}
class MockUserPaymentService {}
class MockUserNotificationPreferenceService {}
class MockUserInterestsService {}
class MockSelectiveCartService {}
describe('CxApiService', () => {
  let authService: AuthService;
  let cmsService: CmsService;
  let routingService: RoutingService;
  let currencyService: CurrencyService;
  let languageService: LanguageService;
  let productService: ProductService;
  let productSearchService: ProductSearchService;
  let productReviewService: ProductReviewService;
  let translationService: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CxApiService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: CmsService, useClass: MockCmsService },

        { provide: PageMetaService, useClass: MockPageMetaService },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },

        { provide: TranslationService, useClass: MockTranslationService },

        { provide: OccEndpointsService, useClass: MockOccEndpointsService },

        { provide: ProductService, useClass: MockProductService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: ProductReviewService, useClass: MockProductReviewService },
        {
          provide: ProductReferenceService,
          useClass: MockProductReferenceService,
        },
        { provide: SearchboxService, useClass: MockSearchboxService },

        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: UserService, useClass: MockUserService },
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: UserConsentService, useClass: MockUserConsentService },
        { provide: UserOrderService, useClass: MockUserOrderService },
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        {
          provide: UserNotificationPreferenceService,
          useClass: MockUserNotificationPreferenceService,
        },
        {
          provide: UserInterestsService,
          useClass: MockUserInterestsService,
        },
        {
          provide: SelectiveCartService,
          useClass: MockSelectiveCartService,
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    cmsService = TestBed.inject(CmsService);
    routingService = TestBed.inject(RoutingService);
    currencyService = TestBed.inject(CurrencyService);
    languageService = TestBed.inject(LanguageService);
    productService = TestBed.inject(ProductService);
    productSearchService = TestBed.inject(ProductSearchService);
    productReviewService = TestBed.inject(ProductReviewService);
    translationService = TestBed.inject(TranslationService);
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
      expect(service.ngZone).toBeTruthy();
    }
  ));
});
