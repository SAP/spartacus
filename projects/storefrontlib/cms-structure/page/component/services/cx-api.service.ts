/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, NgZone, Optional } from '@angular/core';
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
  cmsComponentData?: CmsComponentData<any>;

  constructor(
    // auth
    @Optional() public auth: AuthService,
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
    @Optional() public userAddress: UserAddressService,
    @Optional() public userConsent: UserConsentService,
    @Optional() public userPayment: UserPaymentService,
    @Optional()
    public userNotificationPreferenceService: UserNotificationPreferenceService,
    @Optional()
    public userInterestsService: UserInterestsService,
    // framework
    public ngZone: NgZone
  ) {}
}
