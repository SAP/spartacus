/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, NgZone, inject } from '@angular/core';
import {
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
  TranslationService,
  UserAddressService,
  UserConsentService,
  UserInterestsService,
  UserNotificationPreferenceService,
  UserPaymentService,
} from '@spartacus/core';
import { CmsComponentData } from '../../model';

@Injectable({
  providedIn: 'root',
})
export class CxApiService {
  auth = inject(AuthService, { optional: true });
  cms = inject(CmsService, { optional: true });
  pageMeta = inject(PageMetaService, { optional: true });
  featureConfig = inject(FeatureConfigService, { optional: true });
  globalMessage = inject(GlobalMessageService, { optional: true });
  translation = inject(TranslationService, { optional: true });
  occEndpoints = inject(OccEndpointsService, { optional: true });
  product = inject(ProductService, { optional: true });
  productSearch = inject(ProductSearchService, { optional: true });
  productReview = inject(ProductReviewService, { optional: true });
  productReference = inject(ProductReferenceService, { optional: true });
  searchbox = inject(SearchboxService, { optional: true });
  routing = inject(RoutingService, { optional: true });
  currency = inject(CurrencyService, { optional: true });
  language = inject(LanguageService, { optional: true });
  baseSite = inject(BaseSiteService, { optional: true });
  userAddress = inject(UserAddressService, { optional: true });
  userConsent = inject(UserConsentService, { optional: true });
  userPayment = inject(UserPaymentService, { optional: true });
  userNotificationPreferenceService = inject(UserNotificationPreferenceService, { optional: true });
  userInterestsService = inject(UserInterestsService, { optional: true });
  ngZone = inject(NgZone);

  cmsComponentData?: CmsComponentData<any>;
}
