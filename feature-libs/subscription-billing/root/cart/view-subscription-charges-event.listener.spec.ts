import { TestBed } from '@angular/core/testing';

import { ViewSubscriptionChargesEventListener } from './view-subscription-charges-event.listener';

describe('ViewSubscriptionChargesEventListener', () => {
  let service: ViewSubscriptionChargesEventListener;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSubscriptionChargesEventListener);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
