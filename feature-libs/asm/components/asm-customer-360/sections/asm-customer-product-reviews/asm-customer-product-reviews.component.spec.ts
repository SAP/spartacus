import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerProductReviewsComponent } from './asm-customer-product-reviews.component';

describe('AsmCustomerProductReviewsComponent', () => {
  let component: AsmCustomerProductReviewsComponent;
  let fixture: ComponentFixture<AsmCustomerProductReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmCustomerProductReviewsComponent],
      providers: [
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
      ],
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
