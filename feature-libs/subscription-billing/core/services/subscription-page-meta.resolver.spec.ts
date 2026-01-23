import { TestBed } from '@angular/core/testing';

import { SubscriptionPageMetaResolver } from './subscription-page-meta.resolver';

describe('SubscriptionPageMetaResolverService', () => {
  let service: SubscriptionPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionPageMetaResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
