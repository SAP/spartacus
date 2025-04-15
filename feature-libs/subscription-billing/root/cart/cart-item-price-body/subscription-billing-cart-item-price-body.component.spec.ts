import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBillingCartItemPriceBodyComponent } from './subscription-billing-cart-item-price-body.component';

describe('SubscriptionBillingCartItemPriceBodyComponent', () => {
  let component: SubscriptionBillingCartItemPriceBodyComponent;
  let fixture: ComponentFixture<SubscriptionBillingCartItemPriceBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionBillingCartItemPriceBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionBillingCartItemPriceBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
