import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBillingCartChargesComponent } from './subscription-billing-cart-charges.component';

describe('SubscriptionBillingCartChargesComponent', () => {
  let component: SubscriptionBillingCartChargesComponent;
  let fixture: ComponentFixture<SubscriptionBillingCartChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionBillingCartChargesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionBillingCartChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
