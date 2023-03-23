import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Customer360ReviewList,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerProductReviewsComponent } from './asm-customer-product-reviews.component';

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}
describe('AsmCustomerProductReviewsComponent', () => {
  let component: AsmCustomerProductReviewsComponent;
  let fixture: ComponentFixture<AsmCustomerProductReviewsComponent>;

  const reviewList: Customer360ReviewList = {
    type: Customer360Type.REVIEW_LIST,
    reviews: [
      {
        productName: 'Shirt',
        productCode: 'shirt',
        createdAt: '2022-12-02T20:07:08+0000',
        updatedAt: '2022-12-02T20:07:08+0000',
        rating: '3.5',
        reviewStatus: 'Complete',
        reviewText: '',
      },
      {
        productName: 'Shoes',
        productCode: 'shoes',
        createdAt: '2022-12-02T20:07:08+0000',
        updatedAt: '2022-12-02T20:07:08+0000',
        rating: '4',
        reviewStatus: 'Complete',
        reviewText: '',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AsmCustomerProductReviewsComponent],
      providers: [
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const contextSource = TestBed.inject(Customer360SectionContextSource);
    contextSource.data$.next(reviewList);

    fixture = TestBed.createComponent(AsmCustomerProductReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to product', (done) => {
    const contextSource = TestBed.inject(Customer360SectionContextSource);

    const subscription = contextSource.navigate$.subscribe((event) => {
      expect(event).toEqual({
        cxRoute: 'product',
        params: {
          name: 'Shoes',
          code: 'shoes',
        },
      });

      subscription.unsubscribe();

      done();
    });

    component.navigateTo(reviewList.reviews[1] as any);
  });

  it('should have entries', () => {
    const partialMatch = jasmine.objectContaining;

    expect(component.reviewEntries[0]).toEqual(
      partialMatch({
        productName: 'Shirt',
        productCode: 'shirt',
        createdAt: '2022-12-02T20:07:08+0000',
        updatedAt: '2022-12-02T20:07:08+0000',
        rating: '3.5',
        reviewStatus: 'Complete',
        reviewText: '',
        item: 'Shirt, customer360.productReviews.sku: shirt',
      })
    );
    expect(component.reviewEntries[1]).toEqual(
      partialMatch({
        productName: 'Shoes',
        productCode: 'shoes',
        createdAt: '2022-12-02T20:07:08+0000',
        updatedAt: '2022-12-02T20:07:08+0000',
        rating: '4',
        reviewStatus: 'Complete',
        reviewText: '',
        item: 'Shoes, customer360.productReviews.sku: shoes',
      })
    );
  });
});
