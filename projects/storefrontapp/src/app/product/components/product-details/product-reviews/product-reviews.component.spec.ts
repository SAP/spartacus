import { of } from 'rxjs/observable/of';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MaterialModule } from 'src/app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductReviewsComponent } from './product-reviews.component';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromRoot from './../../../../routing/store';
import * as fromStore from '../../../store';

const productCode = '123';
const product = { code: productCode, text: 'bla' };
const reviews = [{ id: 1, text: 'bla1' }, { id: 2, text: 'bla2' }];

describe('ProductReviewsComponent in product', () => {
  let store: Store<fromStore.ProductsState>;
  let productReviewsComponent: ProductReviewsComponent;
  let fixture: ComponentFixture<ProductReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromStore.reducers)
        })
      ],
      declarations: [ProductReviewsComponent, StarRatingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsComponent);
    productReviewsComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(productReviewsComponent).toBeTruthy();
  });

  it('from store getSelectedProductReviewsFactory', () => {
    spyOn(store, 'select').and.returnValue(of(reviews));

    productReviewsComponent.product = product;
    productReviewsComponent.ngOnChanges();

    expect(productReviewsComponent.reviews$).toBeTruthy();
    productReviewsComponent.reviews$.subscribe(result => {
      expect(result).toEqual(reviews);
    });
  });

  it('a different product code and trigger LoadProductReviews action', () => {
    spyOn(store, 'select').and.returnValue(of(undefined));

    productReviewsComponent.product = product;
    productReviewsComponent.ngOnChanges();
    productReviewsComponent.reviews$.subscribe();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadProductReviews(product.code)
    );
  });
});
