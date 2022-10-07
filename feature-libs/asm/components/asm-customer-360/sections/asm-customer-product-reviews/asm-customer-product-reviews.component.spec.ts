import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmCustomerProductReviewsComponent } from './asm-customer-product-reviews.component';

describe('AsmCustomerProductReviewsComponent', () => {
  let component: AsmCustomerProductReviewsComponent;
  let fixture: ComponentFixture<AsmCustomerProductReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmCustomerProductReviewsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerProductReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
