import { TestBed } from '@angular/core/testing';

import { SubscriptionBillingDetailsPageMetaResolver } from './subscription-billing-details-page-meta.resolver';

describe('SubscriptionBillingDetailsPageMetaResolver', () => {
  let service: SubscriptionBillingDetailsPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionBillingDetailsPageMetaResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
