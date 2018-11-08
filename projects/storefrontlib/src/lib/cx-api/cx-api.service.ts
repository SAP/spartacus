import { Injectable } from '@angular/core';
import {
  ProductReviewService,
  ProductSearchService,
  ProductService
} from '../product/facade/index';
import { CurrencyService, LanguageService } from '@spartacus/core';
import { AuthService } from '../auth/facade/auth.service';
import { CmsService } from '../cms/facade/cms.service';
import { RoutingService } from '../routing/facade/routing.service';

@Injectable({
  providedIn: 'root'
})
export class CxApiService {
  constructor(
    public auth: AuthService,
    public cms: CmsService,
    public routing: RoutingService,
    // site context
    public currency: CurrencyService,
    public language: LanguageService,
    // product
    public product: ProductService,
    public productSearch: ProductSearchService,
    public productReview: ProductReviewService
  ) {}
}
