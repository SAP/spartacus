import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { vi } from 'vitest';
import { CurrentProductService } from '../../current-product.service';
import { ProductReviewsComponent } from './product-reviews.component';
import { MockFeatureDirective } from '@spartacus/storefront/testing/mock-feature-directive';

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

  beforeEach(async () => {
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
        provideMockFeatureToggles({ a11yShowMoreReviewsFocusVisible: false }),
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
  });

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
      expect(fixture.debugElement.nativeElement.textContent).toContain(
        'productDetails.noReviews'
      );
    });
  });

  describe('Keyboard navigation', () => {
    it('should focus the next review item', () => {
      const items = productReviewsComponent.reviewItems.toArray();
      vi.spyOn(items[1].nativeElement, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

      productReviewsComponent.focusNextReview(event, 0);

      expect(items[1].nativeElement.focus).toHaveBeenCalled();
    });

    it('should stay on the last item when at the end', () => {
      const items = productReviewsComponent.reviewItems.toArray();
      const lastIndex = items.length - 1;
      vi.spyOn(items[lastIndex].nativeElement, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

      productReviewsComponent.focusNextReview(event, lastIndex);

      expect(items[lastIndex].nativeElement.focus).toHaveBeenCalled();
    });

    it('should focus the previous review item', () => {
      const items = productReviewsComponent.reviewItems.toArray();
      vi.spyOn(items[0].nativeElement, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

      productReviewsComponent.focusPreviousReview(event, 1);

      expect(items[0].nativeElement.focus).toHaveBeenCalled();
    });

    it('should stay on the first item when at the beginning', () => {
      const items = productReviewsComponent.reviewItems.toArray();
      vi.spyOn(items[0].nativeElement, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

      productReviewsComponent.focusPreviousReview(event, 0);

      expect(items[0].nativeElement.focus).toHaveBeenCalled();
    });
  });

  describe('a11yShowMoreReviewsFocusVisible - Show More Reviews Button Focus', () => {
    let featureTogglesController: MockFeatureTogglesController;

    beforeEach(() => {
      featureTogglesController = TestBed.inject(MockFeatureTogglesController);
    });

    it('should have a11yShowMoreReviewsFocusVisible feature toggle available', () => {
      featureTogglesController.set('a11yShowMoreReviewsFocusVisible', false);
      expect(
        productReviewsComponent['featureToggles']
          ?.a11yShowMoreReviewsFocusVisible
      ).toBe(false);

      featureTogglesController.set('a11yShowMoreReviewsFocusVisible', true);
      expect(
        productReviewsComponent['featureToggles']
          ?.a11yShowMoreReviewsFocusVisible
      ).toBe(true);
    });

    it('should have showMoreLessButton ViewChild available for focus management', () => {
      expect('showMoreLessButton' in productReviewsComponent).toBe(true);
    });

    it('should have maxListItems property for managing review list display', () => {
      expect(productReviewsComponent.maxListItems).toBeDefined();
      expect(typeof productReviewsComponent.maxListItems).toBe('number');
    });

    it('should have initialMaxListItems property set to 5 for default state', () => {
      expect(productReviewsComponent.initialMaxListItems).toBe(5);
    });

    it('should support toggle state changes in tests', () => {
      const toggle = productReviewsComponent['featureToggles'];
      featureTogglesController.set('a11yShowMoreReviewsFocusVisible', false);
      expect(toggle?.a11yShowMoreReviewsFocusVisible).toBe(false);

      featureTogglesController.set('a11yShowMoreReviewsFocusVisible', true);
      expect(toggle?.a11yShowMoreReviewsFocusVisible).toBe(true);
    });

    // Behavioral tests: scroll and focus when toggle is on
    const manyReviews = Array.from({ length: 7 }, (_, i) => ({
      comment: `comment${i}`,
      headline: `headline${i}`,
      alias: `alias${i}`,
    }));

    function renderShowMoreButton(): HTMLButtonElement {
      // Recreate component so async pipe binds to the many reviews.
      fixture = TestBed.createComponent(ProductReviewsComponent);
      productReviewsComponent = fixture.componentInstance;
      (productReviewsComponent as any).reviews$ = of(manyReviews);
      productReviewsComponent.maxListItems =
        productReviewsComponent.initialMaxListItems;
      fixture.detectChanges();
      return productReviewsComponent.showMoreLessButton
        .nativeElement as HTMLButtonElement;
    }

    it('should scroll and focus the button when toggle is on', () => {
      featureTogglesController.set('a11yShowMoreReviewsFocusVisible', true);
      const button = renderShowMoreButton();
      // jsdom does not implement scrollIntoView, so stub it to spy on.
      button.scrollIntoView = () => {};
      const scrollSpy = vi.spyOn(button, 'scrollIntoView');
      const focusSpy = vi.spyOn(button, 'focus');

      productReviewsComponent.toggleReviewsDisplay(manyReviews);

      expect(scrollSpy).toHaveBeenCalledWith({ block: 'center' });
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should not scroll or focus the button when toggle is off', () => {
      featureTogglesController.set('a11yShowMoreReviewsFocusVisible', false);
      const button = renderShowMoreButton();
      button.scrollIntoView = () => {};
      const scrollSpy = vi.spyOn(button, 'scrollIntoView');
      const focusSpy = vi.spyOn(button, 'focus');

      productReviewsComponent.toggleReviewsDisplay(manyReviews);

      expect(scrollSpy).not.toHaveBeenCalled();
      expect(focusSpy).not.toHaveBeenCalled();
    });
  });
});
