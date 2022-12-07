import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPFCheckoutPaymentAndReviewComponent } from './opf-checkout-payment-and-review.component';

describe('OPFCheckoutPaymentReviewComponent', () => {
  let component: OPFCheckoutPaymentAndReviewComponent;
  let fixture: ComponentFixture<OPFCheckoutPaymentAndReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OPFCheckoutPaymentAndReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OPFCheckoutPaymentAndReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
