import { Injectable, Optional } from '@angular/core';

import { AuthService } from '../auth/index';
import { CmsService } from '../cms/index';
import { RoutingService } from '../routing/index';
import { LanguageService, CurrencyService } from '../site-context/index';
import {
  ProductService,
  ProductSearchService,
  ProductReviewService
} from '../product/index';
import { UserService } from '../user/index';

@Injectable({
  providedIn: 'root'
})
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
