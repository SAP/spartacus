import { TestBed, inject } from '@angular/core/testing';
import { CxApiService } from './cx-api.service';

import {
  ProductReviewService,
  ProductSearchService,
  ProductService
} from '@spartacus/core';
import {
  CurrencyService,
  LanguageService,
  RoutingService
} from '@spartacus/core';
import { AuthService } from '../auth/facade/auth.service';
import { CmsService } from '../cms/facade/cms.service';

describe('CxApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CxApiService,
        { provide: AuthService, useValue: 'auth facade' },
        { provide: CmsService, useValue: 'cms facade' },
        { provide: RoutingService, useValue: 'routing facade' },
        { provide: CurrencyService, useValue: 'currency facade' },
        { provide: LanguageService, useValue: 'language facade' },
        { provide: ProductService, useValue: 'product fadace' },
        { provide: ProductSearchService, useValue: 'product search facade' },
        { provide: ProductReviewService, useValue: 'product review facade' }
      ]
    });
  });

  it('should be created', inject([CxApiService], (service: CxApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should provide specific facades', inject(
    [CxApiService],
    (service: CxApiService) => {
      expect(service.auth as any).toEqual('auth facade');
      expect(service.cms as any).toEqual('cms facade');
      expect(service.routing as any).toEqual('routing facade');
      expect(service.currency as any).toEqual('currency facade');
      expect(service.language as any).toEqual('language facade');
      expect(service.product as any).toEqual('product fadace');
      expect(service.productSearch as any).toEqual('product search facade');
      expect(service.productReview as any).toEqual('product review facade');
    }
  ));
});
