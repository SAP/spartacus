import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { MaterialModule } from 'app/material.module';
import { DynamicSlotComponent } from 'app/cms/components/dynamic-slot/dynamic-slot.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
import { PictureComponent } from 'app/ui/components/media/picture/picture.component';
import { ComponentWrapperComponent } from '../../../cms/components/component-wrapper/component-wrapper.component';

import * as fromRoot from '../../../routing/store';
import * as fromProduct from '../../store/reducers';
import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../auth/store';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { ComponentMapperService } from '../../../cms/services/component-mapper.service';
import { AddToCartModule } from '../../../cart/components/add-to-cart/add-to-cart.module';
import { CartService } from '../../../cart/services';

class MockComponentMapperService {}

describe('ProductDetailsComponent in product', () => {
  let store: Store<fromProduct.ProductsState>;
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct = 'mockProduct';
  const mockCartEntry = {};

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          AddToCartModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            products: combineReducers(fromProduct.reducers),
            cart: combineReducers(fromCart.reducers),
            user: combineReducers(fromUser.reducers)
          })
        ],
        declarations: [
          ProductDetailsComponent,
          StarRatingComponent,
          ProductImagesComponent,
          ProductSummaryComponent,
          ProductAttributesComponent,
          ProductReviewsComponent,
          DynamicSlotComponent,
          ComponentWrapperComponent,
          PictureComponent
        ],
        providers: [
          CartService,
          {
            provide: ComponentMapperService,
            useClass: MockComponentMapperService
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    productDetailsComponent = fixture.componentInstance;
    store = TestBed.get(Store);

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
});
