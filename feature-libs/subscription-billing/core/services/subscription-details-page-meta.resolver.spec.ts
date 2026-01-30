import { TestBed } from '@angular/core/testing';

import { SubscriptionDetailsPageMetaResolver } from './subscription-details-page-meta.resolver';

describe('SubscriptionDetailsPageMetaResolver', () => {
  let service: SubscriptionDetailsPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionDetailsPageMetaResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
