import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { CartService } from '../../../../cart/services';
import { ComponentMapperService } from '../../../../cms/services/component-mapper.service';

import { AddToCartModule } from '../../../../cart/components/add-to-cart/add-to-cart.module';
import { MaterialModule } from './../../../../material.module';
import { MediaModule } from './../../../../ui/components/media/media.module';

import * as fromCart from '../../../../cart/store';
import * as fromRoot from '../../../../routing/store';
import * as fromUser from '../../../../user/store';
import * as fromProduct from '../../../store/reducers';

import { ComponentWrapperComponent } from '../../../../cms/components/component-wrapper/component-wrapper.component';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { DynamicSlotComponent } from './../../../../cms/components/dynamic-slot/dynamic-slot.component';
import { ProductDetailsComponent } from './product-details.component';

class MockComponentMapperService {}
const mockTabs = {
  _tabs: {
    _results: [
      { textLabel: 'PRODUCT DETAILS' },
      { textLabel: 'SPECS' },
      { textLabel: 'REVIEWS' },
      { textLabel: 'DELIVERY' }
    ]
  },
  _elementRef: {
    nativeElement: { scrollIntoView: () => {} }
  }
};

describe('ProductDetailsComponent in product', () => {
  let store: Store<fromProduct.ProductsState>;
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct = 'mockProduct';
  const mockCartEntry = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        AddToCartModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromProduct.reducers),
          cart: combineReducers(fromCart.reducers),
          user: combineReducers(fromUser.reducers)
        }),
        MediaModule
      ],
      declarations: [
        ProductDetailsComponent,
        StarRatingComponent,
        ProductImagesComponent,
        ProductSummaryComponent,
        ProductAttributesComponent,
        ProductReviewsComponent,
        DynamicSlotComponent,
        ComponentWrapperComponent
      ],
      providers: [
        CartService,
        {
          provide: ComponentMapperService,
          useClass: MockComponentMapperService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    productDetailsComponent = fixture.componentInstance;
    store = TestBed.get(Store);
    productDetailsComponent.matTabGroup = mockTabs;
    spyOn(store, 'select').and.returnValues(of(mockProduct), of(mockCartEntry));
  });

  it('should be created', () => {
    expect(productDetailsComponent).toBeTruthy();
  });

  it('should call ngOnChanges()', () => {
    productDetailsComponent.productCode = '123456';
    productDetailsComponent.ngOnChanges();
    productDetailsComponent.product$.subscribe(product =>
      expect(product).toEqual(mockProduct)
    );
  });

  it('should be able to go to REVIEWS through the review button', () => {
    productDetailsComponent.goToReviews();
    expect(productDetailsComponent.selectedTabIndex).toBe(2);
  });

  it('should be able to display the review submission form', () => {
    productDetailsComponent.writeReview();
    expect(productDetailsComponent.isWritingReview).toBe(true);
  });
});
