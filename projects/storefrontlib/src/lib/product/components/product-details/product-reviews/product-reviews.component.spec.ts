import { ComponentsModule } from './../../../../ui/components/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromStore from '../../../store';
import * as fromRoot from './../../../../routing/store';
import { ProductReviewsComponent } from './product-reviews.component';
import { ProductReviewService } from '../../../services/product-review.service';

const productCode = '123';
const product = { code: productCode, text: 'bla' };
const reviews = [
  { comment: 'bla1', headline: '1', alias: 'test1' },
  { comment: 'bla2', headline: '2', alias: 'test2' }
];

describe('ProductReviewsComponent in product', () => {
  let productReviewsComponent: ProductReviewsComponent;
  let fixture: ComponentFixture<ProductReviewsComponent>;
  let service: ProductReviewService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromStore.getReducers())
        }),
        ComponentsModule
      ],
      providers: [ProductReviewService],
      declarations: [ProductReviewsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsComponent);
    service = TestBed.get(ProductReviewService);
    productReviewsComponent = fixture.componentInstance;
    productReviewsComponent.product = product;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(productReviewsComponent).toBeTruthy();
  });

  it('from get reviews by product code', () => {
    spyOn(service, 'getByProductCode').and.returnValue(of(reviews));

    productReviewsComponent.ngOnChanges();

    expect(productReviewsComponent.reviews$).toBeTruthy();
    productReviewsComponent.reviews$.subscribe(result => {
      expect(result).toEqual(reviews);
    });
  });

  it('should contain a form object for the review submission form, after init()', () => {
    productReviewsComponent.ngOnInit();
    const props = ['comment', 'title', 'rating', 'reviewerName'];

    props.forEach(prop => {
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
      productReviewsComponent.submitReview();
      expect(productReviewsComponent.isWritingReview).toBe(false);
    });
  });
});
