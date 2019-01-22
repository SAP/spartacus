import { Optional } from '@angular/core';
import { AuthService } from '../auth';
import { CmsService } from '../cms';
import { RoutingService } from '../routing';
import { LanguageService, CurrencyService } from '../site-context';
import {
  ProductService,
  ProductSearchService,
  ProductReviewService
} from '../product';
import { UserService } from '../user';

export class CxApiService {
  constructor(
    @Optional() public auth: AuthService,
    @Optional() public cms: CmsService,
    @Optional() public routing: RoutingService,
    // site context
    @Optional() public currency: CurrencyService,
    @Optional() public language: LanguageService,
    // product
    @Optional() public product: ProductService,
    @Optional() public productSearch: ProductSearchService,
    @Optional() public productReview: ProductReviewService,
    // user
    @Optional() public user: UserService
  ) {}
}
