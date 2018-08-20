import { ComponentsModule } from './../../../../ui/components/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromStore from '../../../store';
import { MaterialModule } from './../../../../material.module';
import * as fromRoot from './../../../../routing/store';
import { ProductReviewsComponent } from './product-reviews.component';

const productCode = '123';
const product = { code: productCode, text: 'bla' };
const reviews = [
  { comment: 'bla1', headline: '1', alias: 'test1' },
  { comment: 'bla2', headline: '2', alias: 'test2' }
];

describe('ProductReviewsComponent in product', () => {
  let store: Store<fromStore.ProductsState>;
  let productReviewsComponent: ProductReviewsComponent;
  let fixture: ComponentFixture<ProductReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromStore.getReducers())
        }),
        ComponentsModule
      ],
      declarations: [ProductReviewsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsComponent);
    productReviewsComponent = fixture.componentInstance;
    productReviewsComponent.product = product;
    store = TestBed.get(Store);
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(productReviewsComponent).toBeTruthy();
  });

  it('from store getSelectedProductReviewsFactory', () => {
    spyOn(store, 'select').and.returnValue(of(reviews));

    productReviewsComponent.ngOnChanges();

    expect(productReviewsComponent.reviews$).toBeTruthy();
    productReviewsComponent.reviews$.subscribe(result => {
      expect(result).toEqual(reviews);
    });
  });

  it('a different product code and trigger LoadProductReviews action', () => {
    spyOn(store, 'select').and.returnValue(of(undefined));

    productReviewsComponent.ngOnChanges();
    productReviewsComponent.reviews$.subscribe();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadProductReviews(product.code)
    );
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
