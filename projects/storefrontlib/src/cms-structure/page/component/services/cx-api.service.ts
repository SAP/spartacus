import { Injectable, NgZone, Optional } from '@angular/core';
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
import { CmsComponentData } from '../../model';

@Injectable({
  providedIn: 'root',
})
export class CxApiService {
  cmsComponentData?: CmsComponentData<any>;

  constructor(
    // auth
    @Optional() public auth: AuthService,
    // cart
    @Optional() public cart: ActiveCartService,
    // cms
    @Optional() public cms: CmsService,
    @Optional() public pageMeta: PageMetaService,
    // features config
    @Optional() public featureConfig: FeatureConfigService,
    // global message
    @Optional() public globalMessage: GlobalMessageService,
    // i18n
    @Optional() public translation: TranslationService,
    // occ
    @Optional() public occEndpoints: OccEndpointsService,
    // product
    @Optional() public product: ProductService,
    @Optional() public productSearch: ProductSearchService,
    @Optional() public productReview: ProductReviewService,
    @Optional() public productReference: ProductReferenceService,
    @Optional() public searchbox: SearchboxService,
    // routing
    @Optional() public routing: RoutingService,
    // site context
    @Optional() public currency: CurrencyService,
    @Optional() public language: LanguageService,
    @Optional() public baseSite: BaseSiteService,
    // user
    @Optional() public user: UserService,
    @Optional() public userAddress: UserAddressService,
    @Optional() public userConsent: UserConsentService,
    @Optional() public userOrder: UserOrderService,
    @Optional() public userPayment: UserPaymentService,
    @Optional()
    public userNotificationPreferenceService: UserNotificationPreferenceService,
    @Optional()
    public userInterestsService: UserInterestsService,
    @Optional() public selectiveCartService: SelectiveCartService,
    // framework
    public ngZone: NgZone
  ) {}
}
