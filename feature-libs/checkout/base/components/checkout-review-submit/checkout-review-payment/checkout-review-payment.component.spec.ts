import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutReviewPaymentComponent } from './checkout-review-payment.component';

describe('CheckoutReviewPaymentComponent', () => {
  let component: CheckoutReviewPaymentComponent;
  let fixture: ComponentFixture<CheckoutReviewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutReviewPaymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutReviewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
