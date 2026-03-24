import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CxDatePipe,
  FeatureDirective,
  I18nTestingModule,
  Product,
  ProductReviewService,
  TranslatePipe,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  FormErrorsModule,
  ItemCounterModule,
  StarRatingComponent,
} from '../../../../shared/index';
import { CurrentProductService } from '../../current-product.service';
import { ProductReviewsComponent } from './product-reviews.component';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';

const productCode = '123';
const product = { code: productCode, text: 'bla' };
const reviews = [
  { comment: 'bla1', headline: '1', alias: 'test1' },
  { comment: 'bla2', headline: '2', alias: 'test2' },
];

class MockProductReviewService {
  getByProductCode(): Observable<any> {
    return of(reviews);
  }
  add() {}
}

@Component({
  selector: 'cx-star-rating',
  template: '',
  imports: [
    ReactiveFormsModule,
    ItemCounterModule,
    I18nTestingModule,
    FormErrorsModule,
  ],
})
class MockStarRatingComponent {
  @Input() rating;
  @Input() disabled;
}

const mockProduct: Product = { code: 'testProduct', name: 'mockProduct' };

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

describe('ProductReviewsComponent in product', () => {
  let productReviewsComponent: ProductReviewsComponent;
  let fixture: ComponentFixture<ProductReviewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductReviewService,
          useClass: MockProductReviewService,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    })
      .overrideComponent(ProductReviewsComponent, {
        add: {
          imports: [
            MockStarRatingComponent,
            I18nTestingModule,
            MockFeatureDirective,
          ],
        },
        remove: {
          imports: [
            StarRatingComponent,
            TranslatePipe,
            CxDatePipe,
            FeatureDirective,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsComponent);
    productReviewsComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(productReviewsComponent).toBeTruthy();
  });

  it('from get reviews by product code', () => {
    expect(productReviewsComponent.reviews$).toBeTruthy();
    productReviewsComponent.reviews$.subscribe((result) => {
      expect(result).toEqual(reviews);
    });
  });

  it('should contain a form object for the review submission form, after init()', () => {
    const props = ['comment', 'title', 'rating', 'reviewerName'];

    props.forEach((prop) => {
      expect(productReviewsComponent.reviewForm.controls[prop]).toBeDefined();
    });
  });

  describe('Logic on displaying review submission form', () => {
    it('should be initiated to hide the form', () => {
      expect(productReviewsComponent.isWritingReview).toBe(false);
    });

    it('should display form on initiateWriteReview()', () => {
      productReviewsComponent.initiateWriteReview();
      expect(productReviewsComponent.isWritingReview).toBe(true);
    });

    it('should hide form on cancelWriteReview()', () => {
      productReviewsComponent.cancelWriteReview();
      expect(productReviewsComponent.isWritingReview).toBe(false);
    });

    it('should hide form on submitReview()', () => {
      productReviewsComponent.submitReview(product);
      expect(productReviewsComponent.isWritingReview).toBe(false);
    });
  });

  describe('Overall rating display', () => {
    it('should display rating component when rating is available', () => {
      mockProduct.averageRating = 4.5;
      fixture = TestBed.createComponent(ProductReviewsComponent);
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector(
          '.header>cx-star-rating'
        )
      ).not.toBeNull();
    });

    it('should not display rating component when rating is unavailable', () => {
      mockProduct.averageRating = undefined;
      fixture = TestBed.createComponent(ProductReviewsComponent);
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector(
          '.header>cx-star-rating'
        )
      ).toBeNull();
    });

    it('should display noReviews when rating is unavailable', () => {
      mockProduct.averageRating = undefined;
      fixture = TestBed.createComponent(ProductReviewsComponent);
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toContain(
        'productDetails.noReviews'
      );
    });
  });

  describe('Keyboard navigation', () => {
    it('should focus the next review item', () => {
      const items = productReviewsComponent.reviewItems.toArray();
      spyOn(items[1].nativeElement, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

      productReviewsComponent.focusNextReview(event, 0);

      expect(items[1].nativeElement.focus).toHaveBeenCalled();
    });

    it('should stay on the last item when at the end', () => {
      const items = productReviewsComponent.reviewItems.toArray();
      const lastIndex = items.length - 1;
      spyOn(items[lastIndex].nativeElement, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

      productReviewsComponent.focusNextReview(event, lastIndex);

      expect(items[lastIndex].nativeElement.focus).toHaveBeenCalled();
    });

    it('should focus the previous review item', () => {
      const items = productReviewsComponent.reviewItems.toArray();
      spyOn(items[0].nativeElement, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

      productReviewsComponent.focusPreviousReview(event, 1);

      expect(items[0].nativeElement.focus).toHaveBeenCalled();
    });

    it('should stay on the first item when at the beginning', () => {
      const items = productReviewsComponent.reviewItems.toArray();
      spyOn(items[0].nativeElement, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

      productReviewsComponent.focusPreviousReview(event, 0);

      expect(items[0].nativeElement.focus).toHaveBeenCalled();
    });
  });
});
