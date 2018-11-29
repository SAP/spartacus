import { Injectable, Optional } from '@angular/core';
import {
  ProductReviewService,
  ProductSearchService,
  ProductService,
  UserService
} from '@spartacus/core';
import {
  CurrencyService,
  LanguageService,
  RoutingService
} from '@spartacus/core';
import { AuthService } from '../auth/facade/auth.service';
import { CmsService } from '../cms/facade/cms.service';

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
