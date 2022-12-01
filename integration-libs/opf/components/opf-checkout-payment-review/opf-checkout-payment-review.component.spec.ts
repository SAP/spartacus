import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPFCheckoutPaymentReviewComponent } from './opf-checkout-payment-review.component';

describe('OPFCheckoutPaymentReviewComponent', () => {
  let component: OPFCheckoutPaymentReviewComponent;
  let fixture: ComponentFixture<OPFCheckoutPaymentReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OPFCheckoutPaymentReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OPFCheckoutPaymentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
