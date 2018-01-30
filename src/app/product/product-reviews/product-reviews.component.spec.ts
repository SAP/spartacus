import { of } from 'rxjs/observable/of';
import { ProductLoaderService } from './../../data/product-loader.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewsComponent } from './product-reviews.component';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../newcms/store/reducers';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

const id = '1981415';
const componentData = {
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
};

class ProductLoaderServiceMock {
  loadProduct(productCode: string): void {}
  getSubscription(productCode: string) {}
  loadReviews(productCode: string) {}
}

fdescribe('ProductReviewsComponent', () => {
  let productReviewsComponent: ProductReviewsComponent;
  let fixture: ComponentFixture<ProductReviewsComponent>;
  let productLoader: ProductLoaderService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          })
        ],
        declarations: [ProductReviewsComponent, StarRatingComponent],
        providers: [
          {
            provide: ProductLoaderService,
            useClass: ProductLoaderServiceMock
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsComponent);
    productReviewsComponent = fixture.componentInstance;
    fixture.detectChanges();
    productLoader = TestBed.get(ProductLoaderService);

    spyOn(productLoader, 'getSubscription').and.returnValue(of(componentData));
  });

  it('should create', () => {
    expect(productReviewsComponent).toBeTruthy();
  });

  it('should load specified reviews data', () => {
    productReviewsComponent.productCode = id;
    productReviewsComponent.ngOnInit();
    expect(productReviewsComponent.reviews).toEqual(componentData.reviews);
  });

  it('should load specified component data', () => {
    // spyOn(productLoader, 'getSubscription').and.returnValue(of(componentData));

    productReviewsComponent.productCode = id;
    productReviewsComponent.ngOnChanges();

    expect(productReviewsComponent.model).toEqual(componentData);
  });
});
