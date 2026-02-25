import { TestBed } from '@angular/core/testing';
import { SubscriptionProductService } from './subscription-product.service';
import { StoreModule } from '@ngrx/store';

describe('SubscriptionProductService', () => {
  let service: SubscriptionProductService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [SubscriptionProductService],
    });
    service = TestBed.inject(SubscriptionProductService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return false for a non-subscription product', () => {
    expect(service.isSubscription({})).toEqual(false);
    expect(service.isSubscription({ sapPricePlan: {} })).toEqual(false);
    expect(service.isSubscription({ sapSubscriptionTerm: {} })).toEqual(false);
  });
  it('should return true for a subscription product', () => {
    expect(
      service.isSubscription({ sapSubscriptionTerm: {}, sapPricePlan: {} })
    ).toEqual(true);
  });
});
