import { TestBed } from '@angular/core/testing';
import { CurrentSubscriptionProductService } from './current-subscription-product.service';
import { SubscriptionProductService } from './subscription-product.service';
import { StoreModule } from '@ngrx/store';
class MockSubscriptionProductService {
  isSubscription(_product: any): boolean {
    return true;
  }
}
describe('CurrentSubscriptionProductService', () => {
  let service: CurrentSubscriptionProductService;
  let subscriptionService: SubscriptionProductService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        CurrentSubscriptionProductService,
        {
          provide: SubscriptionProductService,
          useClass: MockSubscriptionProductService,
        },
      ],
    });
    service = TestBed.inject(CurrentSubscriptionProductService);
    subscriptionService = TestBed.inject(SubscriptionProductService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should show item counter for a non-subscription product', () => {
    spyOn(subscriptionService, 'isSubscription').and.returnValue(false);
    expect(service.showItemCounter({})).toEqual(true);
  });
  it('should not show item counter for a subscription product', () => {
    spyOn(subscriptionService, 'isSubscription').and.returnValue(true);
    expect(service.showItemCounter({})).toEqual(false);
  });
});
