import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutReviewShippingComponent } from './checkout-review-shipping.component';

describe('CheckoutReviewShippingComponent', () => {
  let component: CheckoutReviewShippingComponent;
  let fixture: ComponentFixture<CheckoutReviewShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutReviewShippingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutReviewShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
