import { of } from 'rxjs/observable/of';
import { ProductLoaderService } from './../../../data/product-loader.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromProduct from '../../store/reducers/product.reducer';
import { ProductReviewsComponent } from './product-reviews.component';
import * as fromRoot from '../../../routing/store';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromActions from './../../store/actions';

const id = '1981415';
const mockProduct = { list: ['mockProduct'] };

fdescribe('ProductReviewsComponent in product', () => {
  let store: Store<fromProduct.ProductState>;
  let productReviewsComponent: ProductReviewsComponent;
  let fixture: ComponentFixture<ProductReviewsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers
          })
        ],
        declarations: [ProductReviewsComponent, StarRatingComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsComponent);
    productReviewsComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(mockProduct));
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(productReviewsComponent).toBeTruthy();
  });

  it('should load specified reviews data', () => {
    productReviewsComponent.productCode = id;
    productReviewsComponent.ngOnInit();
    expect(productReviewsComponent.reviews).toEqual(mockProduct.list);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromActions.LoadProductReviews(id)
    );
  });
});
