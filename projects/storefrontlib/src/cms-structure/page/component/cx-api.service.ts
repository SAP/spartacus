import { Injectable, Optional } from '@angular/core';
import {
  AuthService,
  CmsService,
  RoutingService,
  CurrencyService,
  LanguageService,
  BaseSiteService,
  ProductService,
  ProductSearchService,
  ProductReviewService,
  UserService,
  TranslationService,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CxApiService {
  constructor(
    @Optional() public auth: AuthService,
    @Optional() public cms: CmsService,
    @Optional() public routing: RoutingService,
    // site context
    @Optional() public currency: CurrencyService,
    @Optional() public language: LanguageService,
    @Optional() public baseSite: BaseSiteService,
    // product
    @Optional() public product: ProductService,
    @Optional() public productSearch: ProductSearchService,
    @Optional() public productReview: ProductReviewService,
    // user
    @Optional() public user: UserService,
    // translation
    @Optional() public translation: TranslationService
  ) {}
}
