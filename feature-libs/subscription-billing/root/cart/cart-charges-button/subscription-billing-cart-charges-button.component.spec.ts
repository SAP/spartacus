import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBillingCartChargesButtonComponent } from './subscription-billing-cart-charges-button.component';

describe('SubscriptionBillingCartChargesButtonComponent', () => {
  let component: SubscriptionBillingCartChargesButtonComponent;
  let fixture: ComponentFixture<SubscriptionBillingCartChargesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriptionBillingCartChargesButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionBillingCartChargesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
