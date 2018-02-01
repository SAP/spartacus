import { of } from 'rxjs/observable/of';
import { ProductLoaderService } from './../../data/product-loader.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromProduct from '../store/reducers/product.reducer';
import { ProductReviewsComponent } from './product-reviews.component';
import * as fromRoot from '../../routing/store';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

const id = '1981415';
const componentData = {
  list: {
    reviews: [
      {
        comment: 'Lorem ipsum dolor sit amet',
        date: '2018-01-23T13:49:15.21-05:00',
        headline: 'Satisfactory product, but not overwhelmed.',
        id: '8796172615729',
        principal: {
          name: 'Ronald Reviewer',
          uid: 'keenreviewer8@hybris.com'
        },
        rating: 3.0
      },
      {
        comment: 'Lorem ipsum dolor sit amet',
        date: '2018-01-23T13:49:15.209-05:00',
        headline: 'Satisfactory product, but not overwhelmed.',
        id: '8796172582961',
        principal: {
          name: 'Roger Reviewer',
          uid: 'keenreviewer7@hybris.com'
        },
        rating: 3.0
      }
    ]
  }
};

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

    spyOn(store, 'select').and.returnValue(of(componentData));
  });

  it('should create', () => {
    expect(productReviewsComponent).toBeTruthy();
  });

  it('should load specified reviews data', () => {
    productReviewsComponent.productCode = id;
    productReviewsComponent.ngOnInit();
    expect(productReviewsComponent.reviews).toEqual(componentData.list);
  });

  it('should load specified component data', () => {
    productReviewsComponent.productCode = id;
    // productReviewsComponent.ngOnChanges();
    // expect(productReviewsComponent.model).toEqual(componentData[0]);
  });
});
